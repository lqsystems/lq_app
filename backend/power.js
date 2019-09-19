const usbPort = '/dev/ttyUSB1';
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(usbPort)
const parser = port.pipe(new Readline({ delimiter: '\n' }))
parser.on('data', (data) => {
	    console.log(data);
});
