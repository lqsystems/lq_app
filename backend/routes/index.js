var express = require('express');
var router = express.Router();
var fs = require('fs');


const influx = require('influx');



// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

var Reaction = require('../models/reaction');
var Measurements = require('../models/measurements');
var Modules = require('../models/modules');

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

const gURL_logStateActive = '/logStateActive';
const gURL_updateState = '/updateState';
const gURL_delete = '/delete/:id';
const gURL_edit = '/edit';
const gURL_add = '/add';
const gURL_measurements = '/measurements/:id';
const gURL_eventLog = '/eventLog/:id/:direction'
const gURL_requestState = '/requestState/:id/:modId';
const gURL_panel = '/panel/:moduleId';
const gURL_displayUpdate = '/display-update';
const gURL_activeReactionState ='/active-reaction-state/:mid/:id';
const gURL_allActiveReactions = '/all-active-reactions';
const g_Root = '/';
//
//
const gHWCmd_query = 'query';

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ----


// module events go straight to Influx...
//

// data goes to redis -> cached in a file and then batched to influx

// Mongo  -- keeps documents or Reactions and Modules.
//
//


//  Influx to Redis
// readSensorDataToRedis

//  anyplace to Influx
//  influxWriteSensorData


// Mongo -- log data to Influx

// --------------------------------------------------------------------
//  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS
// --------------------------------------------------------------------


//  ADD in redis functionality

var redis = require("redis"),
    redClient = redis.createClient();


redClient.on("error", function (err) {
    console.log("Error " + err);
});



function startEmptyRedis() {
    redClient.flushdb()
}

startEmptyRedis();



// --------------------------------------------------------------------
//  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS  REDIS
// --------------------------------------------------------------------


// -----------------------------------------------------------------------
//  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX
// -----------------------------------------------------------------------



var gDBName = "dosisRev1";


const dosisInflux = new influx.InfluxDB({
    hosts: [
      {
        host: gInfluxUrl,
        protocol: 'http',
        options: {
           rejectUnauthorized: false
        }}
    ],
    database: gDBName,
    schema: [
        {
            measurement: 'sensorData',
            fields: {
                OD: influx.FieldType.FLOAT,
                Temp: influx.FieldType.FLOAT,
                ts: influx.FieldType.INTEGER
            },
            tags:  ['reaction']
        },
        {
            measurement: 'stateLog',
            fields: {
                state: influx.FieldType.BOOLEAN,
                swtch : influx.FieldType.STRING,
                level : influx.FieldType.INTEGER,
                limitLow : influx.FieldType.INTEGER,
                limitHi : influx.FieldType.INTEGER,
                ts: influx.FieldType.INTEGER
            },
            tags: ['reaction']
        }]
});




// single data poin to influx

function makeSensorDataPoint(reactionId,module,OD,Temp,ts) {
    var timeStmp = (ts == undefined) ?  Date.now() : ts;
    var inflx_timeStmp = timeStmp*1000000;
    return({
               measurement: 'sensorData',
               tags: {
                  'reaction' : reactionId
               },
               fields: {
                   'OD': OD,
                   'Temp' : Temp,
                   'ts': timeStmp
               },
               timestamp : inflx_timeStmp
           })
}




// time OD  Temp reaction ts
function influxFIXTIMSTAMPS(tableName) {
    dosisInflux.query(`
                 select * from ${tableName}
                    order by time asc
               `).then(results => {
                           //
                           results.forEach(rslt => {
                                               //
                                               var reactionId = rslt.reaction,
                                               module = null,
                                               OD = rslt.OD,
                                               Temp = rslt.Temp,
                                               ts = rslt.id;
                                               influxWriteSensorDatum(reactionId,module,OD,Temp,ts)
                                           });
                       });
}


function influxFIXTIMSTAMPS_statelog(tableName) {
    dosisInflux.query(`
                 select * from ${tableName}
                    order by time asc
               `).then(results => {
                           //
                           results.forEach(rslt => {
                                               //
                                               var reactionId = rslt.reaction,
                                               module = null,
                                               swtch = rslt.swtch,
                                               state = rslt.state,
                                               level = rslt.level,
                                               limitLow = rslt.limitLow,
                                               limitHi = rslt.limitHi,
                                               ts = rslt.ts;
                                               influxWriteReactionLog(reactionId,module,swtch,state,level,limitLow,limitHi,ts)
                                           });
                       });
}

influxFIXTIMSTAMPS('sensorData');
influxFIXTIMSTAMPS_statelog('stateLog');




function influxWriteSensorData(pointList) {
    //
    dosisInflux.writePoints(pointList,
                            {
                                database: gDBName,
                            }).catch(error => {
                                         console.error(`Error saving data to InfluxDB! ${error.stack}`)
                                     });
}


function influxWriteSensorDatum(reactionId,module,OD,Temp,ts) {
    //
    var sPoint = makeSensorDataPoint(reactionId,module,OD,Temp,ts)
    dosisInflux.writePoints([sPoint],
                            {
                                database: gDBName,
                            }).catch(error => {
                                         console.error(`Error saving data to InfluxDB! ${error.stack}`)
                                     });
}


// Influx to Redis... Sensor data...
function readSensorDataToRedis(reactionId,sendData) {
    dosisInflux.query(`
                 select * from sensorData
                     where reaction = '${reactionId}'
                    order by time asc
               `).then(results => {
                           // slice out data as below
                           var data = JSON.stringify(results)
                           var redisKey = `R-${reactionId}`;
                           //
                           var ODData = results.map( datum => {
                                                        return([datum.ts,datum.OD])
                                                    })
                           var TemperatureData = results.map( datum => {
                                                        return([datum.ts,datum.Temp])
                                                    })
                           //
                           var storeOD = ODData.map(pair => { return(JSON.stringify(pair)) })
                           redClient.set(`${redisKey}-OD`, storeOD.join(',') );
                           var storeTemperature = TemperatureData.map(pair => { return(JSON.stringify(pair)) })
                           redClient.set(`${redisKey}-temp`, storeTemperature.join(',') );

                           sendData(JSON.stringify({ "OD" : ODData, "temp" : TemperatureData }))

                       });
}




// Redis to Influx
function writeSensorDataFromRedisToInflux(reactionId,mid) {
    //
    var redisKey = `R-${reactionId}`;
    var ODredKey = `${redisKey}-OD`;
    var TEMPredKey = `${redisKey}-temp`;
    //
    var callOK = redClient.get(ODredKey,(err,data) => {
                                 if ( data != null ) {
                                       redClient.get(TEMPredKey,(err,data2) => {
                                                         //
                                                         if ( err ) {
                                                                console.log("oops")
                                                         } else {
                                                             data = data.split(',[')
                                                             data2 = data2.split(',[')
                                                             var n = data.length;
                                                             for ( var i = 0; i < n; i++ ) {
                                                                 var datum1 = data[i]
                                                                 var datum2 = data2[i]

                                                                 datum1 = datum1.replace(']','').trim().split(',')
                                                                 datum2 = datum2.replace(']','').trim().split(',')

                                                                 var ts = datum1[0]
                                                                 var OD = datum1[1]
                                                                 var Temp = datum2[1]

                                                                 influxWriteSensorDatum(reactionId,mid,OD,Temp,ts)
                                                             }
                                                         }
                                                     });
                                 }
                             });

}



function writeMeasurementPoint(OD,Temperature,reactionId) {

    var wTime = Date.now()
    var redisKey = `R-${reactionId}`;
    //
    redClient.append(`${redisKey}-OD`, ',' + JSON.stringify([wTime,OD]));
    redClient.append(`${redisKey}-temp`, ',' + JSON.stringify([wTime,Temperature]));

}


function storeData(reactionId,response) {
    readSensorDataToRedis(reactionId,(reactionData) => {
                              response(reactionData);
                          })
}




function makeReactionLogPoint(reactionId,module,swtch,state,level,limitLow,limitHi,ts) {
    //
    var timeStmp = (ts == undefined) ?  Date.now() : ts;
    var inflx_timeStmp = timeStmp*1000000;
    return({
               measurement: 'stateLog',
               tags: {
                  'reaction' : reactionId
               },
               fields: {
                   'state': state,
                   'swtch' : swtch,
                   'level' : (level === undefined) ? 0 : level,
                   'limitLow' : (limitLow === undefined) ? 0 : limitLow,
                   'limitHi' : (limitHi=== undefined) ? 0 : limitHi,
                   'ts': timeStmp
               },
               timestamp : inflx_timeStmp
           })
}



function makeLogPointFromMogoDataLog(rid,logEl) {

    var swtch = logEl["switch"];
    var state = false;
    var level = 0
    if ( swtch == undefined ) {
        // activation of reaction
        swtch = "ACTIVATE";
        state = logEl.active;
    } else {
        state = logEl.state
        if ( logEl.ctrlValue !== undefined ) {
            level = logEl.ctrlValue
        } else {
            level = logEl.level;
            level = ( level == undefined ) ? level = -1 : level;
        }
    }

    state = (state == "ON") ? true : false

    var time = logEl.time;

    var limitLow = -1
    var limitHi = -1;

    return(makeReactionLogPoint(rid,module,swtch,state,level,limitLow,limitHi,time))
}


function influxWriteReactionLog(reactionId,module,swtch,state,level,limitLow,limitHi,ts) {
    var lPoint = makeReactionLogPoint(reactionId,module,swtch,state,level,limitLow,limitHi,ts)
    dosisInflux.writePoints([lPoint],
                            {
                                database: gDBName,
                            }).catch(error => {
                                         console.error(`Error saving data to InfluxDB! ${error.stack}`)
                                     });
}


function influxWriteReactionList(reactionsSet) {
    dosisInflux.writePoints(reactionsSet,
                            {
                                database: gDBName,
                            }).catch(error => {
                                         console.error(`Error saving data to InfluxDB! ${error.stack}`)
                                     });
}



var gEventLogPager = {}
const gEventGulps = 50;


function readLogData(reactionId,direction,handleResults) {

    if ( gEventLogPager[reactionId] == undefined ) {
        gEventLogPager[reactionId] = 0
    }

    if ( direction > 0 ) {
        gEventLogPager[reactionId]++;
    } else {
        gEventLogPager[reactionId]--
        if ( gEventLogPager[reactionId] < 0  ) {
            gEventLogPager[reactionId] = 0;
        }
    }

    //
    //
    var pagePtr = gEventLogPager[reactionId]*gEventGulps;

    dosisInflux.query(`
                 select * from stateLog
                     where reaction = '${reactionId}'
                     order by time desc
                     limit ${gEventGulps} offset ${pagePtr}
               `).then(results => {
                           // slice out data as below
                           if ( results.length == 0 ) {
                               gEventLogPager[reactionId]--;
                           }
                           handleResults(results);
                       })
    //
}



// write all reactions to the Influx DB, where they will stay.
// Record db. getCollection('userData'). update({}, {$unset: {pi: 1}}, {multi: true})

function writeAllReactionLogsToInflux() {
    //
    Reaction.find({}, (err, reactions) => {
        //
        if (err) return handleError(err);
        //
        reactions.forEach((reaction) => {
                              var n = reaction.Datalog.length;
                              var rid = reaction.id;
                              //
                              var reactionsSet = reaction.Datalog.map(logEl => {
                                                                           return(makeLogPointFromMogoDataLog(rid,logEl))
                                                                       });
                              //
                              influxWriteReactionList(reactionsSet);
                      });
    });
}



//
function writeAllMeasurementsToInfluxFromMongo() {
    //-->
    Measurements.find((err, samplesSets) => {
                                   if(err) return handleError(err);
                                   //
                                   var influxPoints = samplesSets.map( sample => {
                                                           var ts = sample.time;
                                                           var reactionId = sample.reaction;
                                                           if ( reactionId !== undefined && sample.point !== undefined ) {
                                                               var OD = sample.point.OD;
                                                               var Temp = sample.point.Temperature;
                                                               return(makeSensorDataPoint(reactionId,module,OD,Temp,ts));
                                                           } else {
                                                               return("empty")
                                                           }
                                                       });
                                    //
                                    influxPoints = influxPoints.filter(pnt => { return(pnt !== "empty"); })
                                    //
                                    influxWriteSensorData(influxPoints)
                               });
}


// -----------------------------------------------------------------------
//  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX  INFLUX
// -----------------------------------------------------------------------







//writeAllMeasurementsToInfluxFromMongo();
//writeAllReactionLogsToInflux();




// -----------------------------------------------------------------------
//  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO   MONGO
// -----------------------------------------------------------------------


function mongoPersistActiveState(id,data,isActive) {
    Reaction.find({'_id': id}, 'active',  (err, reactions) => {  // by id and return Datalog array, etc.
                      if(err) return handleError(err);
                      //
                      if ( reactions.length !== 0) {
                          var reaction = reactions[0];
                          if ( reaction.active != isActive ) {  // event log of change .. does not change hardware
                              //
                              data.time = (new Date()).getTime();
                              data.active = isActive ? "ON" : "OFF";
                              //
                              Reaction.findByIdAndUpdate(
                                  { '_id' : id },
                                  { ModuleState : data, active : isActive },
                                  function (err) {
                                      if(err) return handleError(err);
                                  });
                          }
                          //
                      }
                  });
}


// -----------------------------------------------------------------------
//  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO  MONGO   MONGO
// -----------------------------------------------------------------------




// --------------------------------------------------------------------
// --------------------------------------------------------------------


var gHardwareInterfaceProcess = './routes/hardwareBrokerMulti.js'
// '--inspect=9222',
var hwProcParams = [ '--inspect=9222', gHardwareInterfaceProcess ];
if ( IamCloud ) {
    gHardwareInterfaceProcess = './routes/hardwareBrokerCloud.js'
    hwProcParams = [ gHardwareInterfaceProcess ];
}


// --------------------------------------------------------------------

const { spawn } = require('child_process');

// Spawn a child process. Let node.js hadle the communication.

const HWProc = spawn('node', hwProcParams,
                     {
                         stdio: [process.stdin, process.stdout, process.stderr, 'ipc']
                     });


HWProc.on('close', (code) => {
              console.log(`child process exited with code ${code}`);
});



function requestStateFromHardware(moduleId,reactionId) {
    var time = (new Date()).getTime();
    HWProc.send({ "id" : reactionId, "dest" : moduleId, type : "query", "time" : time });
}


var gACK_queue = []

// Receive message to be forwarded to socket.io clients.
HWProc.on('message', (message) => {
              if ( message.message ) {
                  //ignore ack's
                  if ( message.message === "ACK" ) {
                      while ( gACK_queue.length ) {
                          var ackAction = gACK_queue.shift();
                          ackAction();
                      }

                      return;
                  }
                  var cmd = message.message.cmd;
                  if ( cmd === gHWCmd_query ) {  // STATE REPORT COMMAND  // SOO == SENSOR ON OFF

                      return;  // PROBLEMS BEYOND BELIEF
                      //
                      var mobj = message.message;

                      if ( !IamCloud ) {
                          forwardHardwareMessage(mobj)
                      }

                      var mid = mobj.module;
                      var rid = mobj.id;
                      //
                      var userRAssets = gReactionsToUser[rid];

                      var modObj = userRAssets.getModule(mid);
                      //
                      // Special case for now - update the module description
                      //
                      if ( mobj.SOO !== undefined ) {
                          modObj.moduleState.SensorOnOff = ( mobj.SOO !== 0 ) ? true : false;
                          modObj.parameters.SensorOnOff.ctrlValue = mobj['SOO-ctrlValue'];
                      }
                      if ( mobj.PumpDir !== undefined  && mobj.PumpRate !== undefined  ) {
                          // other actual parameters need one more parameter for the four pumps
                          var dir = mobj.PumpDir;
                          var rate = mobj.PumpRate;
                          if ( rate == 0 ) {
                              // then the motor is not running for anyone
                              modObj.moduleState.water = false;
                              modObj.moduleState.inoculum = false;
                              modObj.moduleState.mixer = false;
                              modObj.moduleState.extraction = false;
                          }
                      }
                      if ( mobj.Lamp !== undefined ) {
                          modObj.moduleState.Lamp = mobj.Lamp;
                          modObj.parameters.Lamp.level = mobj['Lamp-level'];
                      }
                      if ( mobj.Heater !== undefined  ) {
                          modObj.moduleState.Heater = mobj.Heater;
                          modObj.parameters.Heater.level = mobj['Heater-level'];
                      }
                      if ( mobj.Air !== undefined  ) {
                          modObj.moduleState.Air = mobj.Air;
                      }
                      //
                      // Generic starts again
                      //
                      var reactionSet = userRAssets.activeReactions();
                      var modState = {};
                      modState[rid] = reactionSet[rid];  // return just one
                      //
                      //
                      //emitModuleUpdate(modState);

                  } else if ( cmd === 'CRX-LIMIT' && !IamCloud ) {  // LIMIT CROSSOVER
                      var mobj = message.message;
                      var mid = mobj.module;
                      var rid = mobj.id;

                      var state = mobj.LEVEL;
                      var swtch = mobj.LIMIT;
                      //
                      var userRAssets = gReactionsToUser[rid];
                      var modObj = userRAssets.getModule(mid);
                      if ( modObj.limits !== undefined ) {
                          if ( modObj.limits[swtch] !== undefined ) {
                              // get the state that corrects the limit violation.
                              var setVal = modObj.limits[swtch][state];
                              //
                              // now look at the state as it is known in the model object
                              if ( modObj.moduleState[swtch] !== undefined ) {
                                  // make changes if this is a change.
                                  // -- it is possible to receive the limit command more than once for the same violation.
                                  if ( modObj.moduleState[swtch] !== setVal ) {
                                      // change the state
                                      modObj.moduleState[swtch] = setVal;
                                      // change the hardware, too.
                                      var msg = {
                                          "dest": mid,
                                          "id": rid,
                                          data: {
                                              "switch": swtch,
                                              "state": setVal
                                          }
                                      }
                                      //
                                      if ( (modObj.parameters !== undefined) && (modObj.parameters[swtch] !== undefined) ) {
                                          var pars = modObj.parameters[swtch];
                                          for ( var pkey in pars ) {
                                              msg.data[pkey] = pars[pars];
                                          }
                                          if ( msg.data.stop !== undefined ) {
                                              msg.data.start = msg.data.stop;
                                          }
                                      }
                                      //
                                      // send a message just like one that comes from the UI
                                      // or other source.  Let the hardwareBroker format the command
                                      // --
                                      // turn on or off the element defined by the limit report
                                      HWProc.send(msg);   // BACK to process
                                      //
                                      var reactionSet = userRAssets.activeReactions();
                                      var modState = reactionSet[rid];
                                      //
                                      //  TO CLIENT WEB PAGE OR OTHER SERVER
                                      var modState = {};
                                      modState[rid] = reactionSet[rid];  // return just one
                                      emitModuleUpdate(modState);
                                  }
                              }
                          }
                      }

                  } else {   // SEND SENSOR DATA
                      //
                      //console.log(message)
                      HWProc.dataEvents.emit('datum', message);
                      var storeData = message.message;
                      if ( storeData && storeData.OD && storeData.Temperature && storeData.id && !IamCloud ) {
                          if ( !(isNaN(storeData.OD) || isNaN(storeData.Temperature)) ) {
                              //
                              // Redis
                              writeMeasurementPoint(storeData.OD,storeData.Temperature,storeData.id)
                              //
                              // Influx
                              // sensor output ...  really want to cache these and send a batch...
                              // write to local file and then batch from the file...
                              // influxWriteSensorDatum(reactionId,module,OD,Temp,ts)
                              influxWriteSensorDatum(storeData.id,storeData.mid,storeData.OD,storeData.Temperature)
                          }
                      }

                      if ( !IamCloud ) {
                          forwardHardwareMessage(message.message);
                      }

                  }
              }
          })


router.setSocketIo = (io) => {

    HWProc.io = io;

    HWProc.dataEvents = io.of('/data').on('connection', function (socket) {
        socket.on('message', function (data) {
            console.log(data);
        });
    });

    HWProc.hardwareEvents = io.of('/hw').on('connection', function (socket) {
        socket.on('message', function (data) {
            console.log(data);
        });
    });

}



function emitModuleUpdate(modObject) {
     HWProc.dataEvents.emit('module', modObject);
}


// --------------------------------------------------------------------







// SensorOnOff

// LinearAct
// Pump
// Solenoid

var module1Fields = ["SensorOnOff"]
var module2Fields = ["LinearAct", "Pump", "Solenoid"]





function handleError(err) {
    console.log(err);
    return(err)
}

global.loadRootAssets = (userId,renderPage,res) => {
    //
    //
    if ( gUserAssets[userId] == undefined ) {
        gUserAssets[userId] = new UserReactionsAssets(userId,dosisMods);
    }

    var userRAssets = gUserAssets[userId];
    var moduleList = userRAssets.genModuleList()
    //

    if ( userRAssets.needsUpdate("reactions") ) {

        var reactionFields = [ 'id', 'name', 'module', 'media', 'procedure', 'notes', 'ModuleState', 'active' ]

        Reaction.find({ 'user.id': userId }, reactionFields.join(' '), (err, reactions) => {
            //
            if(err) return handleError(err);
            //
            reactions.forEach((reaction) => {
                                  userRAssets.updateReaction(reaction,reactionFields);
                                  gReactionsToUser[reaction.id] = userRAssets;
                          });

            userRAssets.setUpdated("reactions")
            userRAssets.setEdited(false);

            res.render(renderPage, { "modules" : moduleList });
        });

    } else {
        res.render(renderPage, { "modules" : moduleList });
    }

}


//======  ======  ======   ======   ======   ======   ======   ======   ======   ======   ======   ======   ======

//  Get Dashboard and Populate
//
router.get(g_Root, ensureAuthenticated, function(req, res){
    //
    var userId = req.user.id;
    if ( !IamCloud ) {
        loadRootAssets(userId,"index",res);
    } else {
        loadRootAssets(userId,"cloud",res);
    }
    //
});


//
router.get(gURL_allActiveReactions, ensureAuthenticated, function(req, res) {
    //
    var userId = req.user.id;
    if ( gUserAssets[userId] !== undefined ) {
        var userRAssets = gUserAssets[userId];
        var reactionSet = userRAssets.activeReactions();
        res.send(reactionSet)
    } else {
         res.send({})
    }
    //
});


router.get(gURL_activeReactionState, ensureAuthenticated, function(req, res) {
    //
    var userId = req.user.id;
    var reactionId = req.params.id;
    var mid = req.params.mid;

    var userRAssets = gReactionsToUser[reactionId];
    if ( userRAssets !== undefined ) {
        var modObj = userRAssets.getModule(mid);
        var reactState = modObj.moduleState;
        res.send(reactState);
    } else {
        res.send([]);
    }
    //
});





router.post(gURL_displayUpdate, ensureAuthenticated, (req, res) => {
                var userId = req.user.id;

                var cmdObject = req.body;
                var target = cmdObject.target;
                var parameters = cmdObject.parameters;
                switch ( target ) {
                    case "current-module" : {
                        var mid = parameters.mid;
                        if ( mid ) {
                            var userId = req.user.id;
                            if ( gUserAssets[userId] !== undefined ) {
                                var userRAssets = gUserAssets[userId];
                                userRAssets.selectModule(mid);
                            }
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
                //
                res.send({});
            });


router.get(gURL_panel, ensureAuthenticated, (req, res) => {
               //
               var userId = req.user.id;
               //
               var modId = req.params.moduleId;
               //
               var fileName = "views/components/dosis-panel-A.part";
               var data = fs.readFile(fileName,(err,data) => {
                                          if (err) {
                                              res.send("ERR");
                                          }

                                          var msg = data.toString();
                                          msg = subst(msg,"{{mod_name}}",modId);
                                          res.send(msg);
                                      });
            });






router.get(gURL_requestState, ensureAuthenticated, (req, res) => {
               var userId = req.user.id;
               var moduleId = req.params.modId;
               var reactionId = req.params.id;
               // if the reaction is active, data will be passed on to the hardware interface.

               requestStateFromHardware(moduleId,reactionId);
           });




router.get(gURL_eventLog, ensureAuthenticated, (req, res) => {
               //
               var userId = req.user.id;
               var reactionId = req.params.id;
               var pageDirection = req.params.direction;
               //
               readLogData(reactionId,pageDirection,(results) => {
                               var data = JSON.stringify(results);
                               res.send(data);
                           });
               //
           });



router.get(gURL_measurements, ensureAuthenticated, (req, res) => {
               //
               var userId = req.user.id;
               var reactionId = req.params.id;
               //
               console.log(Date.now())

               var redisKey = `R-${reactionId}`;
               var ODredKey = `${redisKey}-OD`;
               var TEMPredKey = `${redisKey}-temp`;
               //
               var callOK = redClient.get(ODredKey,(err,data) => {
                                            if ( data == null ) {
                                                storeData(reactionId,(dataComp) => {
                                                               res.send(dataComp);
                                                          })
                                            } else {
                                                  var ODdata = '[' + data + ']';
                                                  redClient.get(TEMPredKey,(err,data2) => {
                                                                    //
                                                                    if ( err ) res.send({});
                                                                    else {
                                                                        var tData = '[' + data2 + ']';
                                                                        var dataComp = `{ "OD" : ${ODdata}, "temp" : ${tData} }`;
                                                                        res.send(dataComp);
                                                                    }
                                                                });
                                            }
                                        });
               if ( !callOK ) {
                   res.send({});
               }
               //
             });



function defaultModuleState(moduleId,callback) {
    //
    var iniModuleState = {}
    if ( moduleId == "module1" ) {
        module1Fields.forEach(field => {
                                  iniModuleState[field] = {
                                      state : "OFF",
                                      level : 0,
                                      time : 0
                                    }
                              })
    } else if ( moduleId == "module2" ) {
        module2Fields.forEach(field => {
                                  iniModuleState[field] = {
                                      state : "OFF",
                                      level : 0,
                                      time : 0
                                    }
                              })
    }
    //
    callback(iniModuleState);
}



//Add New Reaction
router.post(gURL_add, function(req, res){

    if ( req.body.name && req.body.name.length ) {  // a name is required. Should do client side form validation...

        var userId = req.user._id;
        if ( gUserAssets[userId] ) {
            var userRAssets = gUserAssets[userId];
            userRAssets.setEdited(true);
        }

        var moduleId = req.body.type;
        defaultModuleState(moduleId,(iniModuleState) => {
                               //
                               var newReaction = new Reaction({
                                 name: req.body.name,
                                 module: moduleId,
                                 media: req.body.media,
                                 procedure: req.body.procedure,
                                 notes: req.body.notes,
                                 user: {id: req.user._id, name: req.user.username},
                                 ModuleState : iniModuleState,
                                 active : false
                               });
                               //
                               newReaction.save(function (err){
                                 if (err) throw err;
                                 console.log(newReaction);
                                 res.redirect(g_Root);
                               });
                               //
                           });
    } else {
        res.redirect(g_Root);
    }

});






//Edit Reaction
router.post(gURL_edit, function(req,res){

    var rid = req.body.id;  // rection id

    var userRAssets = gReactionsToUser[rid];
    userRAssets.setEdited(true);

    Reaction.findByIdAndUpdate(
                {_id: rid },
                {name: req.body.name, media: req.body.media, procedure: req.body.procedure, notes: req.body.notes},
                function(err){
                    if(err) return handleError(err);
                    res.redirect(g_Root);
                });
});

//Delete Reaction
router.delete(gURL_delete, (req, res) => {

    var rid = req.params.id;  // rection id

    var userId = req.user._id;
    if ( gUserAssets[userId] ) {
        var userRAssets = gUserAssets[userId];
        userRAssets.setEdited(true);
        userRAssets.deleteReaction(rid);
    }

    Reaction.remove({_id: req.params.id }, function(err){
      if(err) return handleError(err);
      res.sendStatus(200);
      // console.log(reaction + ' has been deleted')
    });

});



function filterParameterAnnotation(param) {
    //
    if ( param.indexOf('-amount') > 0 ) {
        return('amount');
    }
    //
    if ( param.indexOf('-rate') > 0 ) {
        return('rate');
    }

    return(param);
}



function forwardToHardware(changeSet,moduleName,moduleStates,data) {

    var csetKeys = Object.keys(changeSet);
    // sort change set w/r/t state.

    var msg = { "dest" : moduleName, 'id' : data.activeId, "data" : {} }

    csetKeys.forEach( swtch => {
                         //
                         var dataSet = {}
                         dataSet.time = (new Date()).getTime();
                         dataSet['switch'] = swtch;
                         dataSet.state = changeSet[swtch];
                         //
                         influxWriteReactionLog(data.activeId,
                                                moduleName,
                                                swtch,
                                                dataSet.state,
                                                dataSet.level,dataSet.limitLow,dataSet.limitHi)
                         //
                         var swtcPars = `${moduleName}-${swtch}-parameters`;
                         //
                         if ( data[swtcPars] ) {
                             for ( var par in data[swtcPars] ) {
                                 var val = data[swtcPars][par];
                                 par = filterParameterAnnotation(par)
                                 dataSet[par] = val;
                             }
                         }

                         msg.data = dataSet;
                         //
                        HWProc.send(msg);
                     });
}


function forwardLimitToHardware(modObj,mkey,moduleName,data) {
    var msg = { "dest" : moduleName, 'id' : data.activeId, "type" : "limit", "data" : {} }
    msg.data.Sensor = modObj.limits[mkey].Sensor;
    msg.data["HIGH-value"] = modObj.limits[mkey]["HIGH-value"];
    msg.data["LOW-value"] = modObj.limits[mkey]["LOW-value"];
    HWProc.send(msg);
}


function changeLimits(limits,limitSet) {

    for ( var key in limits ) {
        if ( limitSet[key] !== undefined ) {
            if ( limitSet[key] !== limits[key] ) return(true)
        }
    }

    return(false);
}

// ---- ---- ---- ---- ---- ---- ---- ---- ----

router.post(gURL_updateState, (req,res) => {
                //
                var data = req.body;
                var mid = data.mid; // module id
                var id = data.activeId;
                //
                var userRAssets = gReactionsToUser[id]
                if ( userRAssets !== undefined ) {
                    var modObj = userRAssets.getModule(mid);
                    if ( modObj ) {
                        //
                        var moduleStates = modObj.moduleState;
                        if ( moduleStates ) {
                            //  takes states from the DB object
                            var changeSet = {}
                            for ( var mkey in moduleStates ) {
                                var value = data.allStates[mkey];
                                if ( value !== undefined ) {
                                    var hardwareUpdate = ( moduleStates[mkey] != value );
                                    moduleStates[mkey] = value;
                                    if ( hardwareUpdate ) {
                                        changeSet[mkey] = value;
                                    }
                                }

                                var swtcPars = `${mid}-${mkey}-parameters`;
                                if ( data[swtcPars] !== undefined ) {
                                    var pars = data[swtcPars];
                                    var parsSet = modObj.parameters[mkey];
                                    for ( var par in parsSet ) {
                                        if (  pars[par] !== undefined ) {
                                            parsSet[par] = pars[par];
                                        }
                                    }
                                }
                            }

                            //
                            forwardToHardware(changeSet,mid,moduleStates,data);  // data contains the carries if any..
                        }

                        //--
                        var moduleLimits = modObj.limits;
                        if ( moduleLimits ) {
                            for ( var mkey in moduleLimits ) {
                                //
                                if ( mkey in changeSet ) {
                                    var swtcLimits = `${mid}-${mkey}-limits`;
                                    //
                                    if ( data[swtcLimits] !== undefined ) {
                                        //
                                        var limits = data[swtcLimits];
                                        var limitSet = modObj.limits[mkey];
                                        //
                                        if ( modObj.limits[mkey].active ) {
                                            if ( !changeLimits(limits,limitSet) ) {
                                                continue;
                                            }
                                        }
                                        //
                                        modObj.limits[mkey].active = true;
                                        //
                                        for ( var lim in limitSet ) {
                                            if ( limits[lim] !== undefined ) {
                                                limitSet[lim] = limits[lim];
                                            }
                                        }

                                        //
                                        forwardLimitToHardware(modObj,mkey,mid,data);
                                    }
                                }
                            }
                        }
                    }

                    // after telling the modules to assume a state. Wait a bit and then ask.
                    // handling an ACK could do this as well.
                    gACK_queue.push(() => {
                                        requestStateFromHardware(mid,id);
                                    });

                }

                res.send({})

            });




// Edit Reaction
// Record the change of state in the reaction.
// If the hardware is available and the reaction is active,
// pass the message on to the hardware interface.

router.post(gURL_logStateActive, (req,res) => {  // keep this separate
                var userId = req.user.id;

                var data = req.body;

                var id = data.id;   // data includes some fields needed for queries, but not needed for hardware management
                delete data.id;

                var isActive = data.active;  // whether or not the panle is enabled.
                delete data.active;
                res.send('{}');  // send a basic OK to back to the browser

                var mid = data.mid;
                //
                var userRAssets = gReactionsToUser[id];
                if ( userRAssets ) {
                    userRAssets.setReactionActivity(id,isActive);
                }
                //

                influxWriteReactionLog(id,mid,"ACTIVATE",isActive,-1,-1,-1,Date.now())
                mongoPersistActiveState(id,data,isActive);
            })


module.exports = router;
