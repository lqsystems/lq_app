

// Arrays are defined at the top of the page.
// These are used to store the elements of reaction panels.
//
if ( window.dosisApp === undefined ) {
    window.dosisApp = {}
}

window.dosisApp.moduleType = "module1"; // start with a prefered tab for the kinds of modules.

//
// buttons modules
window.dosisApp.modules = {}
window.dosisApp.reactionButtons = {}
window.dosisApp.switchToModule = {}
window.dosisApp.moduleToSwitch = {}

// groups of buttons that are mutually exclusive
window.dosisApp.switchGroups = {}

// just list switches
window.dosisApp.setupSwitches = [];

// output fields where values are written
window.dosisApp.dataReceivers = {}

window.dosisApp.currentReactions = {}
window.dosisApp.reactionsToModules = {}

window.dosisApp.switchStates = {}
window.dosisApp.reactionButtonToID = {}
//
window.dosisApp.lockOnUse = {}
window.dosisApp.zeroOnOff = {}
//
window.dosisApp.valueLinks = {}

// These are called at the end of panels (in the HTML loading sequence)
// as soon as elements in the panel can be recorded.

function addActivityButton(ID,reactionButtionId,moduleId) {
    // REACTION TO MODULE
    if ( window.dosisApp.reactionButtons[moduleId] === undefined ) {
        window.dosisApp.reactionButtons[moduleId] = { open: [], closed : [] }
        window.dosisApp.reactionButtonToID[moduleId] = {}
    }
    //  KEEP TRACK OF MODULES
    if ( window.dosisApp.modules[moduleId] === undefined ) {
        window.dosisApp.modules[moduleId] = { "mid" : moduleId, "allStates" : {}, "changes" : [] }
    }

    window.dosisApp.reactionButtons[moduleId].open.push(reactionButtionId)
    window.dosisApp.reactionButtonToID[moduleId][reactionButtionId] = ID
    window.dosisApp.reactionsToModules[ID] = moduleId
}



function setCurrentModule(ID,moduleId) {
    window.dosisApp.currentReactions[moduleId] = ID;
}


function addSwitch(switchID,moduleId) {
    dosisApp.setupSwitches.push(switchID);
    dosisApp.switchToModule[switchID] = moduleId;
    if ( dosisApp.moduleToSwitch[moduleId] == undefined ) {
        dosisApp.moduleToSwitch[moduleId] = [];
    }
    dosisApp.moduleToSwitch[moduleId].push(switchID);
    dosisApp.switchStates[switchID] = { 'state' : false, 'module' : moduleId }
}


function lockOnUse(el,locker) {
    window.dosisApp.lockOnUse[el] = locker;
}

function zeroOnOff(el,zeroer) {
    window.dosisApp.zeroOnOff[el] = zeroer;
}

var disableValueField = (el) => {
    var pnd_e = $('#' + el);
    pnd_e.prop("disabled", "disabled");
    pnd_e.css("border","green solid 1px")
}
var zeroValueField = (el) => {
    var pnd_e = $('#' + el);
    pnd_e.val("0");
    pnd_e.prop("disabled",false);
    pnd_e.css("border","grey dotted 1px")
}



function valueLink(mainSwitch,valueSources) {
    window.dosisApp.valueLinks[mainSwitch] = { "values" : valueSources }
}


function senderReceiverField(dataSource,reportElement,deltaValueSource,moduleId) {
    //
    if ( dosisApp.dataReceivers[moduleId] === undefined ) {
        dosisApp.dataReceivers[moduleId] = {}
    }

    dosisApp.dataReceivers[moduleId][dataSource] = { reporter : reportElement, delta : deltaValueSource }
}


function declareGroup(groupElements) {
    var groupArray = JSON.parse(JSON.stringify(groupElements));
    groupArray.forEach( grpEl => {
                           window.dosisApp.switchGroups[grpEl] = groupArray;
                       })
}

//
function checkPropInGroupOff(el,aProp) {
    if ( window.dosisApp.switchGroups[el] ) {
        var grp = window.dosisApp.switchGroups[el]
        var n = grp.length;
        for ( var i = 0; i < n; i++ ) {
            var obj = $('#' +  grp[i]);
            if ( obj.prop(aProp) ) {
                return false;
            }
        }
        return true;
    }
    return(false);
}


function prepare_active_module(mod_name) {
    dosisApp.moduleType = mod_name
}
