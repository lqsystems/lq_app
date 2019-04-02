/* eslint-disable node/no-missing-require */
'use strict';

var fs = require('fs');
var logger = require('../utility/logger');
const print = require('../utility/print');

function clonify (obj) {
    return JSON.parse(JSON.stringify(obj));
}



var gACKReceived = {};
var gACKCmdQueue = {};

var gCurrentModuleTime = new Date();
var gCurrentModuleTime_minutes = gCurrentModuleTime.getMinutes();
var gCurrentModuleTime_hours = gCurrentModuleTime.getHours();
var gCurrentModuleTime_DOM = gCurrentModuleTime.getDate();
var gCurrentModuleTime_month = gCurrentModuleTime.getMonth();
var gCurrentModuleTime_year = gCurrentModuleTime.getFullYear();


var allminutes = gCurrentModuleTime_hours * 60 + gCurrentModuleTime_minutes;
var timeCmd = `initT,cmd:STME,mins:${allminutes},day:${gCurrentModuleTime_DOM},mo:${gCurrentModuleTime_month},year:${gCurrentModuleTime_year}`

// CONFIG -- drives requirements, options, and call values

var config = require('./dosisConfig.js')

function setupConfiguration (aConfig) {
    //
    if (aConfig.hardwarePins == undefined) {
        aConfig.hardwarePins = {}
    }
    //
    var pairs = {};
    for (var key in aConfig) {
        if (key.substr(0, "modules".length) == "modules") {
            pairs[key] = ""
        }
    }
    for (var key in aConfig) {
        if (key.substr(0, "def-modules".length) == "def-modules") {
            var sinks = key.substr("def-".length);
            pairs[sinks] = key;
        }
    }
    for (var key in pairs) {
        var moduleNames = aConfig[key];
        var def = aConfig[pairs[key]];
        moduleNames.forEach(mm => {
            aConfig.hardwarePins[mm] = clonify(def)
            aConfig.hardwarePins[mm].mcu = mm;
        })
    }

    for (var mm in aConfig.hardwarePins) {
        var onModComs = aConfig.hardwarePins[mm]["on-module-commands"];
        aConfig.hardwarePins[mm].cmdUploadList = []
        aConfig.hardwarePins[mm].cmdUploadList.push(onModComs.commands.join(','))
        aConfig.hardwarePins[mm].cmdUploadList.push(onModComs.parameters.join(','))
        aConfig.hardwarePins[mm].cmdUploadList.push(onModComs.keywords.join(','))
    }

    //

}


function initializationSequence (uPort) {

    var mcu = ""
    for (var matchMCU in gMCUPortMap) {
        if (gMCUPortMap[matchMCU] === uPort) {
            mcu = matchMCU;
            break;
        }
    }

    //
    var initSeqStartStr = "z!x1" + mcu + "\n";
    uPort.write(initSeqStartStr); // start the sequece
    //
}


function initializationNext (str) {
    //
    console.log(str);
    //
    var stepIndx = str[3];
    var rest = str.substr(4).trim();
    var directions = rest.split(':');
    var mcu = directions[0].trim();
    var ok = directions[1].trim();
    var respType = directions[2].trim();
    //
    var uPort = gMCUPortMap[mcu];
    //
    if ((ok == "OK") && (uPort !== undefined)) {
        if (respType == "Loaded") {
            stepIndx = parseInt(stepIndx);
            stepIndx++;
            var nextSeqStartStr = "z!x" + stepIndx + mcu + "\n";
            uPort.write(nextSeqStartStr); // start the sequece
        } else if (respType == "init") {
            uPort.write(timeCmd + '\n');
            console.log(timeCmd)
        } else {
            var i = parseInt(stepIndx) - 1;
            if (i < config.hardwarePins[mcu].cmdUploadList.length) {
                var strBlock = config.hardwarePins[mcu].cmdUploadList[i];
                uPort.write(strBlock + '\n');
            } else {
                uPort.write("anything\n");
            }
        }
    }

}




//


// ----------------  CONFIG

setupConfiguration(config)



// ----------------

function sendAck () {
    if (process.send) {
        process.send({ message: "ACK" });
    }
}



// Depending on which config fields are defined the different serial options are enabled.
const SerialPort = (typeof config.serial !== 'undefined') ? (!(config.serial.testing) ? require("serialport") : require("serialport/test"))
    : undefined;


// pins from the configuration.. This does not protect the program from bad definition
// It does select the hardware elements that are supposed to be in use.
const gModuleOutputs = config.hardwarePins;
const uartsAll = (typeof config.serial !== 'undefined') ? config.serial.uarts : undefined;  // get the fist uart -- this may change

//------------ ------------ ------------ ------------ ------------ ----------


const Readline = SerialPort.parsers.Readline;


// TEST VERSION
if ((typeof config.serial !== 'undefined') && config.serial.testing) {
    // TEST VERSION
    // Create a mock port at the path.
    uartsAll.forEach(uarti => {
        const MockBinding = SerialPort.Binding;
        MockBinding.createPort(uarti.port, { echo: true, record: false });
    })
} // else nothing




// Create a uart port interface


var uartPorts = [];
var gMCUPortMap = {}
var gMCUPreambles = {}

if (typeof uartsAll !== 'undefined') {  // use Serial Port class. Baud rate in config
    uartsAll.forEach(uarti => {
        var uartPort = new SerialPort(uarti.port, {
            baudRate: uarti.baud
        });
        uartPorts.push(uartPort);
        gMCUPortMap[uarti.mcu] = uartPort;
    })
}




function operationMessage (msg) {
    //
    if (typeof msg === "string") {
        msg += "\n"
        return msg
    } else {
        var sMessage = JSON.stringify(msg);
        sMessage += "\n"
        //
        return (Buffer.from(sMessage));
    }
}


function stateFromString (value, heldHigh) {
    //
    if (value === 1 || value === 0) return (value);
    //
    if (typeof value === "string") {
        //
        if (value.toLowerCase() === "on" || value.toLowerCase() === "off") {
            value = (value.toLowerCase() === "on" ? 1 : 0);
        } else if (value.toLowerCase() === "yes" || value.toLowerCase() === "no") {
            value = (value.toLowerCase() === "yes" ? 1 : 0);
        } else if (/[0-9]+\.*[0-9]*/.test(value)) {

            console.log(value)
            value = parseInt(value);
            value = Math.round(value * (255.0 / 100.0))
            console.log(value)

            return (value);  // numerical value
        }
    }

    if ((heldHigh != undefined) && (heldHigh == true)) {
        value = value ? 0 : 1;
    }

    return (value);
}


//------------ ------------ ------------ ------------ ------------ ----------


function constructServerMessage (messageBackToServer, rewriteCmd) {
    //
    messageBackToServer = messageBackToServer.trim();
    // auto switch a machine state per config
    var splitMessage = messageBackToServer.split(',');
    var mm = splitMessage.shift().trim();
    var srverData = gMCUPreambles[mm];

    if (srverData !== undefined) {
        while (splitMessage.length) {
            var pair = splitMessage.shift().trim();
            pair = pair.split(':')
            srverData[pair[0].trim()] = pair[1].trim();
        }
        if (rewriteCmd) {
            srverData.cmd = rewriteCmd;
        }
        return ({ message: srverData });
    }

    return (false)
}



//------------ ------------ ------------ ------------ ------------ ----------


//
var gWritesOK = false;

function lineParserHandler (str) {

    console.log("lineParserHandler->" + str)

    var msg = "";
    var init = null;

    str = str.toString();

    if (str.indexOf("z!x") == 0) {  // initialization sequence
        initializationNext(str);
        return;
    }

    if (str.indexOf("TICK") == 0) {
        return;
    }
    if (str.indexOf("ERR") == 0) {
        console.log(str);
        return;
    }
    if (str.indexOf("DBG") == 0) {
        console.log(str);
        return;
    }
    if (str.indexOf("CRX") == 0) {
        // handle sensor cross over response.
        var messageBackToServer = str.substr(3); // use the rest of it

        logger.debug('** CRX Message Detected **');
        logger.debug(messageBackToServer);

        //
        var srvMsg = constructServerMessage(messageBackToServer, "CRX-LIMIT");

        logger.debug('** SrvMsg **')
        logger.debug(srvMsg)

        if (srvMsg && process.send) {
            if (srvMsg.message.LIMIT === "temperature") srvMsg.message.LIMIT = "Heater";
            process.send(srvMsg);
        }
        //
        return;
    }
    if (str.indexOf("QRY") == 0) {
        // handle sensor cross over response.
        var messageBackToServer = str.substr(3); // use the rest of it
        //
        var srvMsg = constructServerMessage(messageBackToServer, "query");
        if (srvMsg && process.send) {
            process.send(srvMsg);
        }
        //
        return;
    }
    if (str.indexOf("ACK") == 0) {
        var mid = str.substr(3).trim();
        dequeueMessageOnACK(mid);
        return;
    }

    var messageBackToServer = str;
    if (process.send && messageBackToServer.length) {   // anything to send and a place to send it.
        //
        var srvMsg = constructServerMessage(messageBackToServer, 'sensors');
        if (srvMsg) {
            process.send(srvMsg);
        }
        //
    }

}

/*
function tester() {
    console.log("RUNNING TESTER")
    process.send({ message : { "cmd" : "sensor", "OD" : "FOO", "Temperature" : "JUNK", "id" : "59d9d29278f80e47d5786c22", "module" : "buzzer"}});
}
*/

var dataPortReady = false;

// SERIAL PORT OEPRATIONS

if (uartPorts) {
    uartPorts.forEach(uartPort => {

        //  dataPortReady -- because message can be received before a port is available
        uartPort.on('open',
            ((uPort) => {
                return (() => {
                    // This point enable any communication with the server, etc.
                    dataPortReady = true;
                    console.log("data port open")
                    uPort.write('\n');
                    setTimeout(() => {
                        initializationSequence(uPort);
                    }, 2000)
                })
            })(uartPort));

        const lineParser = new Readline();

        //
        uartPort.pipe(lineParser);   // configure to use the line parser
        lineParser.on('data', lineParserHandler);    // CALL lineParserHandler

        // log received data
        uartPort.on('data', (data) => {
            // console.log("data event")
        });

    });

}

function isStateRequest (serverMessage) {
    if (serverMessage.type !== undefined) {
        if (serverMessage.type === "query") {
            return (true);
        }
    }
    return (false);
}


function isLimitRequest (serverMessage) {
    if (serverMessage.type !== undefined) {
        if (serverMessage.type === "limit") {
            return (true);
        }
    }
    return (false);
}


function sendStateRequest (serverMessage) {
    // message...
    var moduleObj = gModuleOutputs[serverMessage.dest];
    if (moduleObj) {
        var mcu = moduleObj.mcu;
        //
        if (serverMessage.id === undefined) {
            if (gMCUPreambles[mcu]) {
                serverMessage.id = gMCUPreambles[mcu].id;
            }
        }
        //
        var parseable = mcu + ',';
        parseable += 'cmd:SREQ,qry:ALL';  // just send the module the query command..
        gMCUPreambles[mcu] = { "id": serverMessage.id, "cmd": 'query', "module": mcu }
        //
        var uartPort = gMCUPortMap[mcu];
        if (uartPort && moduleObj.connector === "serial") {
            var opMessage = operationMessage(parseable);
            if (opMessage.length) {
                console.log("sendStateRequest");
                console.log(opMessage);
                uartPort.write(opMessage, () => {  // write the message with a callback.
                    console.log('Write:\t\t Complete!');
                });
            }
        }
    }
}


/*

  Serial.print("DBG=>handleReportCmd ");
  Serial.print(stateStr);
  Serial.print(",");
  Serial.println(ky_ON);

*/


function sendLimitCommand (serverMessage) {
    var moduleObj = gModuleOutputs[serverMessage.dest];
    if (moduleObj) {
        var mcu = moduleObj.mcu;
        //
        if (serverMessage.id === undefined) {
            if (gMCUPreambles[mcu]) {
                serverMessage.id = gMCUPreambles[mcu].id;
            }
        }
        //
        var parseable = mcu + ',';
        parseable += 'cmd:LIMT';  // just send the module the query command..
        gMCUPreambles[mcu] = { "id": serverMessage.id, "cmd": 'limit', "module": mcu }
        parseable += ",sens:" + serverMessage.data.Sensor;
        parseable += ",HIGH:" + serverMessage.data["HIGH-value"];
        parseable += ",LOW:" + serverMessage.data["LOW-value"];
        console.log("sendLimitCommand");
        console.log(parseable)
        //
        var uartPort = gMCUPortMap[mcu];
        if (uartPort && moduleObj.connector === "serial") {
            var opMessage = operationMessage(parseable);
            if (opMessage.length) {
                uartPort.write(opMessage, () => {  // write the message with a callback.
                    console.log('Write:\t\t Complete!');
                });
            }
        }
    }
}


function messageToHardware (serverMessage) {

    // The message is going to this hardware.
    //  hPins is from the configuration.
    var module = gModuleOutputs[serverMessage.dest];   /// the field 'from' selects the pin descriptor. (e.g. IRState);
    /// 'from' identifies element first coming from the web page.
    var data = serverMessage.data;

    if (module) {                    ///  The def was there.

        var mcu = module.mcu;
        var messageList = [];

        //
        var parseable = mcu + ',';
        parseable += 'cmd:' + data['switch'] + ',';
        gMCUPreambles[mcu] = { id: serverMessage.id, cmd: data['switch'], "module": mcu }

        var ctrlKey = data['switch'];
        var effector = undefined;
        var commander = undefined;
        if (module.controls || module.commands) {
            //
            effector = module.controls[ctrlKey];  // config data
            commander = module.commands[ctrlKey]
            //
            if ((effector === undefined) && (commander === undefined)) {
                //
                if (module.translates && module.translates[ctrlKey]) {
                    //
                    var tCtrlKey = module.translates[ctrlKey].key;
                    if (tCtrlKey) {

                        var translateData = module.translates[ctrlKey];
                        effector = module.controls[tCtrlKey];  // one or both defined
                        commander = module.commands[tCtrlKey];

                        if (translateData.state) {
                            data[translateData.state] = data.state;
                        }

                        if (translateData.static) {
                            data[translateData.state] = translateData.static.state;
                        }

                        if (translateData.convert) {
                            var cnvrtDet = translateData.convert;
                            // just convert rate and amount to start stop
                            // op ...
                            // "convert" : [ "rate" : "amount", "op" : "rateamout"]
                            //
                            data.start = 0;
                            data.stop = (data.rate > 0) ? Math.round((data.amount) / data.rate) * 1000 : 0;
                            if (cnvrtDet.fixed !== undefined) {
                                //
                                for (var dk in cnvrtDet.fixed) {
                                    var field = dk;
                                    var stateKey = data.state;
                                    if (typeof data.state === "boolean") {
                                        stateKey = data.state ? "ON" : "OFF";
                                    }
                                    if (cnvrtDet.fixed[dk][stateKey] !== undefined) {
                                        var value = cnvrtDet.fixed[dk][stateKey];
                                        data[field] = value;
                                    }
                                }
                                //
                            }
                        }

                        parseable = mcu + ',';
                        parseable += 'cmd:' + tCtrlKey + ',';
                    }
                }
            }
        }

        if (module.controls && effector) {
            //
            if (effector) {
                //
                var sequence = effector.seq;
                //
                messageList = sequence.map((step) => {
                    if ((serverMessage.data[step] !== undefined) && effector[step]) {
                        var omessage = "";
                        //
                        var value = serverMessage.data[step];   // value from the message (originally on the page)
                        if (effector[step].write == "DIGITAL") {
                            // turn it into the data needed (very simple translation)
                            value = stateFromString(value, effector[step].heldHigh);
                            // what the value means
                            value = value ? effector[step].high : effector[step].low;
                        }

                        var ptrans = module["parameter-translates"];
                        if (ptrans[step]) {
                            step = ptrans[step];
                        }

                        //
                        omessage += step + ':' + value;
                        return (omessage);
                    }
                });
                var msg = parseable + messageList.join(",");
                messageList = [msg];
            }
            //
        } else if (module.commands && commander) {
            var cmd = commander
            var sendKeys = cmd.send;
            //
            sendKeys.forEach(skey => {
                //
                var sdat = data[skey]
                if (typeof sdat === "string") {
                    if (sdat.indexOf(',') >= 0) {
                        sdat = sdat.replace(',', '|')
                    }
                } else {
                    if (typeof sdat === "boolean") {
                        sdat = stateFromString(sdat, cmd[skey].heldHigh);
                        // what the value means
                        sdat = sdat ? cmd[skey].high : cmd[skey].low;
                    }

                }
                //
                var ptrans = module["parameter-translates"];
                if (ptrans[skey]) {
                    skey = ptrans[skey];
                }
                //
                parseable += skey + ':' + sdat + ','
            })
            //
            messageList.push(parseable)
        }

        //
        console.log(messageList);

        if (messageList.length) {
            if (mcu) {
                var uartPort = gMCUPortMap[mcu];
                if (uartPort && module.connector === "serial") {
                    //
                    messageList.forEach(message => {  // now execute the list.
                        //
                        var opMessage = operationMessage(message);
                        if (opMessage.length) {
                            uartPort.write(opMessage, () => {  // write the message with a callback.
                                console.log('Write:\t\t Complete!');
                                // do an ack here if you want...
                            });
                        }
                        //
                    })
                    //
                }
            } else {
                // send any response back
                if (process.send) {
                    process.send({ message: "ACK" });
                }
            }

        } else {
            dequeueMessageOnACK(mcu);
        }

    }

}



var gACLTimer = {};


function watchACKTimer (mid) {
    if (gACLTimer[mid] === null || gACLTimer[mid] === undefined) {
        gACLTimer[mid] = setTimeout(() => {
            if (!gACKReceived[mid]) {
                dequeueMessageOnACK(mid);
            }
        }, 5000);
    }
}

function haltACKTimer (mid) {
    if (gACLTimer[mid] !== null && gACLTimer[mid] !== undefined) {
        clearTimeout(gACLTimer[mid]);
        gACLTimer[mid] = null;
    }
}


function dequeueMessageOnACK (mid) {
    //
    var mkey = "" + mid;
    if (gACKCmdQueue[mkey] == undefined) {
        gACKCmdQueue[mkey] = []
        gACKReceived[mkey] = true;
    }

    if (gACKCmdQueue[mkey].length) {
        haltACKTimer(mkey);  // no longer needed
        var message = gACKCmdQueue[mkey].shift();
        gACKReceived[mid] = false;

        if (isStateRequest(message)) {
            sendStateRequest(message);
        } else if (isLimitRequest(message)) {
            sendLimitCommand(message);
        } else {
            messageToHardware(message);
        }

        watchACKTimer(mkey);
    } else {
        gACKReceived[mkey] = true;
        haltACKTimer(mkey); // make sure
        sendAck();
    }
}





function handleMessages (message) {
    //
    var mkey = "" + message.dest;
    //
    if (gACKCmdQueue[mkey] == undefined) {
        gACKCmdQueue[mkey] = []
        gACKReceived[mkey] = true;
    }
    // interact with hardware..
    if (true || dataPortReady) {  //TESTING
        //
        gACKCmdQueue[mkey].push(message);  // always put the message on the queue even if it is the only one

        if (gACKReceived[mkey]) {  // go ahead and send if the device is not busy
            dequeueMessageOnACK(mkey)
        } else {
            watchACKTimer(mkey);
        }

        //
    }
    //
}



// Handle messages from the web server...
process.on('message', (message) => {
    // setTimeout(tester,1000);
    //
    console.log("messageToHardware")
    console.dir(message, { depth: 4 });
    console.log("__");
    //
    haltACKTimer("" + message.dest)
    handleMessages(message);
    //
});

