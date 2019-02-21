
var gAPIPrefix = "";
if ( gController_is_cloud ) {
    gAPIPrefix = "/cloud"
}

var gAll_Active_Reactions = '/all-active-reactions';
var gRequestState = '/requestState/';
//
var gEventLog = '/eventLog/'
var gMeasurements = '/measurements/'
var gPanel = '/panel/'
//
var gDisplay_Update =  '/display-update'
var gLogStateActive =  gAPIPrefix + '/logStateActive'
var gUpdateState =  gAPIPrefix + '/updateState'


// ==========/ ==========/ ==========/ ==========/ ==========/ ==========


function timeConversion(val) {
    if ( typeof val === "string" ) {
        if ( val.indexOf(':') >= 0 ) {
            var vals = val.split(':');
            var hrs = vals[0].length ? parseInt(vals[0]) : 0;
            var mins = vals[1].length ? parseInt(vals[1]) : 0;
            mins += hrs*60;
            return(mins);
        } else {
            return parseInt(val)
        }
    }
    return(val)
}



function updateReactions(activeReactions,dontChangeReactionButton) {
    //
    dosisApp.setModuleType(dosisApp.moduleType)
    //
    for ( var react in activeReactions ) {
        //
        var reactionButton = `#ReactionActive-${react}`;
        if ( dontChangeReactionButton !== true ) {
            $(reactionButton).prop('checked',true).trigger('change');
        }
        var switchStates = activeReactions[react].state;
        var levels = activeReactions[react].levels;
        var limits = activeReactions[react].limits;
        var module = dosisApp.reactionsToModules[react];
        //
        for ( var swtch in switchStates ) {
            //
            var state = switchStates[swtch];
            var moduleSwitch = `${module}-${swtch}`
            var hID = `#${moduleSwitch}`;
            dosisApp.switchStates[moduleSwitch].state = state;
            //
            var mObj = dosisApp.modules[module];
            mObj.allStates[swtch] = state;
            //
            $(hID).prop('page-load',true)
            $(hID).prop('checked',state).trigger('change');
            //
        }
        //
        for ( var swtch in levels ) {
            //
            var params = levels[swtch];
            for ( var par in params ) {
                //
                switch ( par ) {
                    case "ctrlValue" : {
                        var target = `#${module}-${swtch}-ctrlParam`;
                        $(target).val(params[par]);
                        break;
                    }
                    case "start" : {
                        var sWtch = swtch.toLowerCase();
                        var target = `#${module}-start-${sWtch}`;
                        $(target).val(params[par]);
                        break;
                    }
                    case "stop" : {
                        var sWtch = swtch.toLowerCase();
                        var target = `#${module}-stop-${sWtch}`;
                        $(target).val(params[par]);
                        break;
                    }
                    case "level" : {
                        // data-slider-value="0"
                        var moduleSwitch = `${module}-${swtch}`;
                        //
                        if ( window.dosisApp.valueLinks[moduleSwitch] ) {
                            var valLinks = window.dosisApp.valueLinks[moduleSwitch].values;
                            valLinks.forEach(valTarget => {
                                                 if ( valTarget.indexOf('slider') > 0 ) {
                                                     var hashVT = '#' + valTarget;
                                                     $(hashVT).html(params[par])

                                                     var other = valTarget.replace('-Value','');
                                                     hashVT = '#' + other;
                                                     $(hashVT).slider('setValue', params[par], true);
                                                 }
                                             })
                        }
                        //
                        break;
                    }
                    case "material-rate" : {
                        var target = `#${module}-material-rate`;
                        $(target).val(params[par]);
                        break;
                    }
                    case "material-amount" : {
                        var target = `#${module}-material-amount`;
                        $(target).val(params[par]);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }

        for ( var swtch in limits ) {
            var moduleSwitch = `${module}-${swtch}`;
            //
            var limitVals = limits[swtch];
            var sensor = limits[swtch].Sensor;
            var rangeSlider = `#${module}-slider-${sensor}-range`;
            //
            var collectLimits = [0,0]
            //
            if ( window.dosisApp.valueLinks[moduleSwitch] ) {
                var valLinks = window.dosisApp.valueLinks[moduleSwitch].values;
                // {{mod_name}}-slider-temperature-range
                valLinks.forEach(valTarget => {
                                     if ( ( valTarget.indexOf('slider') > 0 ) && ( valTarget.indexOf('low') > 0 ) ) {
                                         var val = limitVals["LOW-value"] ;
                                         var hashVT = '#' + valTarget;
                                         $(hashVT).html(val)

                                         collectLimits[0] = parseInt(val);
                                     }
                                     if ( ( valTarget.indexOf('slider') > 0 ) && ( valTarget.indexOf('high') > 0 ) ) {
                                         var val = limitVals["HIGH-value"] ;
                                         var hashVT = '#' + valTarget;
                                         $(hashVT).html(val)

                                         collectLimits[1] = parseInt(val);
                                     }
                                 })
                //
                $(rangeSlider).slider('setValue', collectLimits, true);

            }
            //
        }
    }
}



// ==========  ==========  ==========  ==========  ==========  ==========  ==========  ==========  ==========



// Add this to controls...
var iploc = window.location
var dataIo = io.connect(iploc + 'data');

dataIo.on('connect', function (message) {
     // tell the interface...
    console.log(message);
 });


dataIo.on('datum', (datum) => {
    // put data in the right recepticle
    var message = datum.message;
    //
    var moduleId = message.module;
    var ID = message.id;
    //
    var receivers = dosisApp.dataReceivers[moduleId];
    for ( var datKey in receivers ) {
        var val = message[datKey];
        if ( val !== undefined ) {
            var its = dosisApp.dataReceivers[moduleId][datKey];
            if ( its ) {
                var rep = '#' + its.reporter;
                $(rep).html(val)
            }
        }
    }
    //
 });



dataIo.on('module',(modStates) => {
              updateReactions(modStates,true);
          });



$(() => {
      // Create an application structure that can be accessed globally
      if ( window.dosisApp === undefined ) {
          window.dosisApp = {}
      }
      //
      //
      window.dosisApp.setModuleType = (moduleType) => {

          // so that the editing tabs no which reaction the module
          // belongs to.
          window.dosisApp.moduleType = moduleType;
          $("#add-form-type").val(moduleType);
          $("#edit-moduleID").val(moduleType);


          var mods = Object.keys(dosisApp.modules)
          mods.forEach ( mod => {
                             $(`#${mod}-reaction-lists`).hide();
                        })
          $(`#${moduleType}-reaction-lists`).show();

          sendDisplayUpdate("current-module",{  "mid" : moduleType });
      }

  })



///   AJAX CALLS

function getActiveReactions() {
    // request a list of all reactions that should be operating on page loads
    //
    $.ajax({
        type: 'get',
        url: gAll_Active_Reactions,      // this url is found in the server as an 'express' route
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: updateReactions
    });
    //
    //
}



// /active-reaction-state/:mid/:id

function getActiveReactionState(id) {
    //
    var module = dosisApp.reactionsToModules[id];
    $.ajax({
        type: 'get',
        url: gAll_Active_Reactions + `/${module}/${id}`,      // this url is found in the server as an 'express' route
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success:  (activeState) => {
                   //
                   for ( var k in activeState ) {
                       var state = activeState[k];
                       //
                       var reactionButton = `#${module}-${k}`;
                       $(reactionButton).prop('checked',state).trigger('change');
                   }
        }
    });
}




function getCurrentSwitchStates() {
    //
    for ( var module in window.dosisApp.reactionButtonToID ) {
        var id =  window.dosisApp.currentReactions[module];
        // ----
        if ( id !== undefined ) {
            $.ajax({
                type: 'get',
                url: gRequestState + id + '/' + module,      // this url is found in the server as an 'express' route
                contentType: "application/json; charset=utf-8",
                traditional: true,
                success: function (data) {
                    //$(reporter).html(data)

                }
            });
        }
    }
    //
    //
}




function sendDisplayUpdate(displayTarget,parameters) {
    //
    var message = {
        "target" : displayTarget,
        "parameters" : parameters
    }

    $.ajax({
        type: 'post',
        url: gDisplay_Update,      // this url is found in the server as an 'express' route
        data: JSON.stringify(message),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {

        }
    });

}



// Send values to the DB and set hardware states.
//
function sendActiveToDB(DbId,moduleId,active) {
    // DbId of db entry...

    if ( gController_is_cloud ) {
        return;
    }

    var time = (new Date()).getTime();

    var messages = {
        "id" : DbId,
        "time" : time,
        "mid" : moduleId,
        "active" : active
    }


    $.ajax({
        type: 'post',
        url: gLogStateActive,      // this url is found in the server as an 'express' route
        data: JSON.stringify(messages),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {

        }
    });

}




var gSenderQueue = [];
function sendFront(squeue) {

    if ( gController_is_cloud ) {
        return;
    }

    //
    if ( squeue.length == 0 ) return;
    var mid = squeue.shift();
    //
    var mObjectStates = JSON.stringify(dosisApp.modules[mid]);
    dosisApp.modules[mid].changes = [];
    //
    $.ajax({
        type: 'post',
        url: gUpdateState,      // this url is found in the server as an 'express' route
        data: mObjectStates,
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            sendFront(squeue);
        }
    });
}




function updateCarries(mObj,swtch) {
    //
    if ( window.dosisApp.valueLinks && window.dosisApp.valueLinks[swtch] ) {
        //
        var vSources = window.dosisApp.valueLinks[swtch].values;
        if ( mObj[swtch + '-parameters'] == undefined ) {
            mObj[swtch + '-parameters'] = {}
        }
        if ( mObj[swtch + '-limits'] == undefined ) {
            mObj[swtch + '-limits'] = {}
        }
        //
        vSources.forEach(vsource => {
                             if ( vsource.indexOf("-Value") > 0 ) {
                                 if ( ( vsource.indexOf("-low") > 0 ) ) {
                                     mObj[swtch + '-limits']["LOW-value"] =  $("#" + vsource).html();
                                 } else if ( ( vsource.indexOf("-high") > 0 ) ) {
                                     mObj[swtch + '-limits']["HIGH-value"] =  $("#" + vsource).html();
                                 } else {
                                     mObj[swtch + '-parameters'].level = $("#" + vsource).html();
                                 }
                             } else if ( vsource.indexOf("-start") > 0 ) {
                                 mObj[swtch + '-parameters'].start = timeConversion($('#' + vsource).val());
                             } else if ( vsource.indexOf("-stop") > 0 ) {
                                 mObj[swtch + '-parameters'].stop = timeConversion($('#' + vsource).val());
                             } else if ( vsource.indexOf("-ctrlParam") > 0 ) { //ctrlParam -> ctrlValue
                                 mObj[swtch + '-parameters'].ctrlValue = $('#' + vsource).val();
                             } else {
                                 var srcParts = vsource.split('-');
                                 if ( srcParts.length > 1 ) {
                                     srcParts.shift();
                                     var fieldName = srcParts.join('-');
                                     mObj[swtch + '-parameters'][fieldName] = $('#' + vsource).val();
                                 }
                                 //
                                 var swtchParts = swtch.split('-');
                                 var simpleSwtch = swtchParts[1];
                                 if ( (dosisApp.lockOnUse[vsource] !== undefined) && mObj.allStates[simpleSwtch] ) {
                                     (dosisApp.lockOnUse[vsource])(vsource);
                                 }
                                 //
                                 if ( (dosisApp.zeroOnOff[vsource] !== undefined) && !(mObj.allStates[simpleSwtch]) ) {
                                     if ( checkPropInGroupOff(swtch,"checked") ) {
                                         (dosisApp.zeroOnOff[vsource])(vsource);
                                     }
                                 }
                             }
                         })
    }
    //
}


//
// each switch change is enqueued and ordered
//
function queueChange(switchEl,state) {
    var parts = switchEl.split('-');
    var mid = parts[0];
    var swtch = parts[1];
    //
    var mObj = dosisApp.modules[mid];
    if ( mObj ) {
        if ( mObj.allStates[swtch] != state ) {
            dosisApp.modules[mid].changes.push(swtch);
            mObj.allStates[swtch] = state;
            updateCarries(mObj,switchEl);
        }
    }
    //
    gSenderQueue.push(mid);
    sendFront(gSenderQueue);
}




function addLabel(lTxt) {
    var txt = `<label>${lTxt}</label>`
    return(txt)
}


function addData(key,dat) {
    //
    var dTxt = ""
    if ( dat[key] !== undefined ) {
        dTxt = "" + dat[key];
        if ( key == "time" ) {
            //dTxt = (new Date(parseInt(dTxt))).toUTCString();
            //dTxt = (new Date(parseInt(dTxt))).toLocaleString();
        }
    }

    var txt = `<span style='padding-left:2px;padding-right:2px'>${dTxt}</span>`
    return(txt)
}





var gReactionInView = '-'

function requestDataLog(direction) {

    var reporter = "#event-log";    // '/eventLog/:id'

    $.ajax({
        type: 'get',
        url: gEventLog + gReactionInView + '/' + direction,      // this url is found in the server as an 'express' route
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {

            data = JSON.parse(data);

            liLine = data.map( el => {
                                  var listEl = "<li style='padding:1px'>"
                                  listEl += addLabel("Time:")
                                  listEl += addData("time",el)
                                  if ( el.swtch ) {
                                      listEl += addLabel("Switch:")
                                      listEl += addData("swtch",el)
                                  }
                                  if ( el.state ) {
                                      listEl += addLabel("State:")
                                      el.state = el.state ? "ON" : "OFF"
                                      listEl += addData("state",el)
                                  }

                                  if ( el.swtch.toLowerCase() != "heater" ) {
                                      delete el.limitHi
                                      delete el.limitLow
                                  }

                                  delete el.state;
                                  delete el.swtch
                                  delete el.time
                                  delete el.reaction;
                                  delete el.ts;




                                  for ( var k in el ) {
                                      listEl += addLabel(`${k}:`)
                                      listEl += addData(k,el)
                                  }

                                  listEl += "</li>"
                                  return(listEl);
                              })

            $(reporter).html(liLine.join("\n"))
        }
    });

}


function requestMeasurements(DbId) {    // '/measurements/:id'
    //

    var reporter_OD = "#data-log-OD";
    var reporter_temp = "#data-log-temp";

    var options = {
        canvas: true,
        xaxes: [ { mode: "time" } ],
        yaxes: [ { min: 0 }, {
            position: "left",
            alignTicksWithAxis: 1
        } ],
        legend: { position: "sw" },
        shadowSize: 0
    }


    $.ajax({
        type: 'get',
        url: gMeasurements + DbId,      // this url is found in the server as an 'express' route
        contentType: "text/plain; charset=ascii",
        traditional: true,
        success: function (data) {

            var datArray = JSON.parse(data);

            $.plot("#data-log-OD", [ datArray["OD"] ], options);
            $.plot("#data-log-temp", [ datArray["temp"] ], options);

        }
    });

}









// ==================================

// This request works when Bootstrap is not being used
// NOT IN USE THIS VERSION

function requestPanels() {    // '/measurements/:id'
    //
    for ( var mid in window.dosisApp.modules ) {
        //
        $.ajax({
            type: 'get',
            url: gPanel + mid,      // this url is found in the server as an 'express' route
            contentType: "text/plain; charset=ascii",
            traditional: true,
            success:  ((modId) => {
                           return((data) => {
                                      var container = "#controls-type-" + modId;
                                      $(container).html(data);
                                  });})(mid)
        });

    }

}




// ==================================


$(function() {
    //
    // This is mostly for updating the screen in relation to the slider changing...
    //
    $(".slider").slider({ "enabled" : !gController_is_cloud });
    $(".slider").each((index,slider) => {
                          var sid = $(slider).attr('id');
                          $(slider).on("slide", ((sliderId) => {
                                                   return((slideEvt) => {
                                                              if ( sliderId && sliderId.length ) {
                                                                  var hashID = '#' + sliderId;
                                                                  var controllerId = sliderId.replace('-slider','') + "-control";


                                                                  var sVals = slideEvt.value

                                                                  if ( (typeof sVals == 'object') && sVals.length ) {
                                                                      var lowHash = hashID.replace('range','low')
                                                                      var highHash = hashID.replace('range','high')
                                                                      $(lowHash + "-Value").text(sVals[0]);
                                                                      $(highHash + "-Value").text(sVals[1]);
                                                                  } else {
                                                                    $(hashID + "-Value").text(slideEvt.value);  // value
                                                                  }

                                                                  var bHashID = '#' + controllerId;
                                                                  $(bHashID).prop('enabled',true);  // enable

                                                                  // Also remove deactivation
                                                                  var classes = $(bHashID).attr('class');
                                                                  if ( classes ) {
                                                                      classes = classes.replace("deactivate","")
                                                                      $(bHashID).attr('class',classes)
                                                                  }
                                                              }
                                                          });
                                               })(sid));



                      });
    //

})




// The reaction panel being enabled implies that its components
// are enabled according to their current hardware state.

// ReactionActive-{{_id}}-control
// ReactionActive-{{_id}}

function deactivateSwitch(moduleObj) {
    if ( moduleObj ) {
        if ( moduleObj.activeSwitch ) {
            var switchId = moduleObj.activeSwitch;
            var id = moduleObj.activeId;
            //
            moduleObj.activeSwitch = undefined;
            moduleObj.activeId = undefined;
            //
            //
            $('#' + switchId).prop('checked',false).trigger('change');
            var reactionDiv = '#reactDiv' + id;
            $(reactionDiv).attr('style',"border:")
        }
    }
}

function activateSwitch(moduleObj,reactionButtionId,id) {
    if ( moduleObj ) {
        moduleObj.activeSwitch = reactionButtionId
        moduleObj.activeId = id;
        //
        var switchId = moduleObj.activeSwitch;
        var hashID = '#' + switchId;
        // active reaction.  remove 'deactivate' style
        var classes = $(hashID + "-control").attr('class');
        classes = classes.replace("deactivate","");
        $(hashID + "-control").attr('class',classes);
        var reactionDiv = '#reactDiv' + id;
        $(reactionDiv).attr('style',"border:2px solid green");
    }
}


///
function updateReactionPanels(reactionButtionId,id) {
    //
    var reactionButton = '#' + reactionButtionId;
    var mid = $(reactionButton).attr('module');
    var moduleObj = window.dosisApp.modules[mid];
    //
    deactivateSwitch(moduleObj);
    //
    var reactLable = `#${mid}-current-reactions`;
    $(reactLable).html(id);
    //
    var controlled = `#ctrl-A-${id}`;
    var activeOnOff = $(reactionButton).prop('checked');
    var link = $(controlled);

    if ( activeOnOff ) {

        $(`#${mid}-edit-reaction`).prop('data-id',id)
        $(`#${mid}-view-reaction-data`).prop('data-id',id)
        $(`#${mid}-delete-reaction`).prop('data-id',id)

        if ( !gController_is_cloud ) {
            activateSwitch(moduleObj,reactionButtionId,id);
            sendActiveToDB(id,mid,true)
        }

    } else {

        if ( !gController_is_cloud ) {
            sendActiveToDB(id,mid,false)
        }
    }
    //
}




$(function() {
    // group buttons
    //
    for ( var grpEl in window.dosisApp.switchGroups ) {
        var hashID = '#' + grpEl;
        $(hashID).change(((gel)=>{
                              return(() => {  // change the state of others in group
                                         var hID = '#' + gel;
                                         //
                                         if ( $(hID).prop('page-load') ) {
                                              $(hID).prop('page-load',false);
                                         } else {
                                             //
                                             if ( window.dosisApp.changingGroup === undefined || window.dosisApp.changingGroup.length == 0 ) {
                                                 //
                                                 window.dosisApp.changingGroup = [].concat(window.dosisApp.switchGroups[gel]);
                                                 while ( window.dosisApp.changingGroup.length ) {
                                                     var swtch = window.dosisApp.changingGroup.shift();
                                                      if ( (gel !== swtch) && dosisApp.switchStates[swtch].state ) {
                                                         var jqBtn = '#' + swtch;
                                                         $(jqBtn).prop('source-control',gel);
                                                         dosisApp.switchStates[swtch].state = false;

                                                         var parts = swtch.split('-');
                                                         var mid = parts[0];
                                                         var swtchPlain = parts[1];

                                                         var mObj = dosisApp.modules[mid];
                                                         mObj.allStates[swtchPlain] = false;

                                                         $(jqBtn).prop('checked',false).trigger('change');
                                                         //queueChange(swtch,false)
                                                      }
                                                 }
                                             }

                                             dosisApp.switchStates[gel].state  = $(hID).prop('checked');
                                             queueChange(gel,dosisApp.switchStates[gel].state);
                                         }
                                     });
                          })(grpEl));
    }
});



// CURRENT REV
$(function() {
    //
    if ( typeof dosisApp.reactionButtons !== 'undefined' ) {
        //
        for ( var mid in dosisApp.reactionButtons ) {
            var reactionButtonList = dosisApp.reactionButtons[mid].open;
            reactionButtonList.forEach(reactionButtionId => {
                                           var reactionButton = '#' + reactionButtionId;
                                           $(reactionButton).change(() => {
                                                                        var idparts = reactionButtionId.split('-');
                                                                        if ( idparts.length > 1 ) {
                                                                            var id = idparts[1];
                                                                            updateReactionPanels(reactionButtionId,id)
                                                                         }
                                                                     });
                                           $(reactionButton).attr('module',mid);
                                       });
        }
    }


    if ( dosisApp.moduleToSwitch ) {
        for ( var mid in dosisApp.moduleToSwitch ) {
            var switches = dosisApp.moduleToSwitch[mid];
            if ( switches ) {
                switches.forEach(swtch => {
                                     if ( window.dosisApp.switchGroups[swtch] == undefined ) {
                                         var swtchBtn = '#' + swtch;
                                         $(swtchBtn).change(((vswtch) => {
                                                                 return(() => {
                                                                            var hID = '#' + vswtch;
                                                                            if ( $(hID).prop('page-load') ) {
                                                                                 $(hID).prop('page-load',false);
                                                                            } else {
                                                                                var state =$('#' + vswtch).prop('checked');
                                                                                queueChange(vswtch,state)
                                                                            }
                                                                        });
                                                             })(swtch));
                                     }
                                 });
            }
        }
    }

});


$(function() {

    getActiveReactions();

})

