/* eslint-disable node/no-missing-require */
'use strict';

var fs = require('fs');



const WebSocket = require('ws');
const wss = new WebSocket.Server({ 'port': 8282 });
console.log("WebSocket server created")

wss.on('connection', (ws) => {
           //
           console.log('connection made 8282');
           //
           ws.on('message', (message) => {
                     console.log('received: %s', message);
                     try {
                         var msgJSON = JSON.parse(message);
                         process.send({ message : msgJSON });
                     } catch (e) {
                         console.log(e)
                     }
                 });
           //
           ws.on('close',() => { });
       });



var gACKReceived = {};
var gACKCmdQueue = {};

var gCurrentModuleTime = new Date();
var gCurrentModuleTime_minutes = gCurrentModuleTime.getMinutes();
var gCurrentModuleTime_hours = gCurrentModuleTime.getHours();
var gCurrentModuleTime_DOM = gCurrentModuleTime.getDate();
var gCurrentModuleTime_month = gCurrentModuleTime.getMonth();
var gCurrentModuleTime_year = gCurrentModuleTime.getFullYear();


var allminutes = gCurrentModuleTime_hours*60 + gCurrentModuleTime_minutes;
var timeCmd = `initT,cmd:STIME,mins:${allminutes},day:${gCurrentModuleTime_DOM},month:${gCurrentModuleTime_month},year:${gCurrentModuleTime_year}`





// ----------------

function sendAck() {
    process.send({ message : "ACK" });
}

//------------ ------------ ------------ ------------ ------------ ----------


// Handle messages from the web server...
process.on('message', (message) => {
               //
           });

