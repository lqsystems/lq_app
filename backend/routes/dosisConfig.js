


module.exports = {

    "modules-A" : [ "Prime1", "MV1", "Prime2", "MV2" ],
    "def-modules-A" : {
        connector : "serial",
        mcu : "<template-mod-name>",
        connector : "serial",
        controls : {

            ﻿LEDTest : {
                "state" : { write : "DIGITAL", heldHigh : false  },
                "seq" : [ "state" ]
            },
            LAMP : {
                "state" : { write : "DIGITAL", heldHigh : true, "high" : "HIGH", "low" : "LOW"  },
                "level" : { write : "ANALOG" },
                "start" : { write : "ANALOG" },
                "stop" : { write : "ANALOG" },
                "seq" : [ "state", "level", "start", "stop" ]
            },
            ﻿PUMP : {
                "dir" : { write : "DIGITAL", "high" : "ON", "low" : "OFF"  },
                "level" : { write : "ANALOG" },
                "start" : { write : "ANALOG" },
                "stop" : { write : "ANALOG" },
                "seq" : [ "dir", "level", "start", "stop" ]
            },
            AIRS : {
                "state" : { write : "DIGITAL", heldHigh : true, "high" : "HIGH", "low" : "LOW"  },
                "seq" : [ "state" ]
            },
            ﻿HEAT : {
                "state" : { write : "DIGITAL", heldHigh : true, "high" : "HIGH", "low" : "LOW"  },
                "level" : { write : "ANALOG" },
                "seq" : [ "state", "level" ]
            },
            STEP : {
                "state" : { write : "DIGITAL", "high" : "HIGH", "low" : "LOW"  },
                "level" : { write : "ANALOG" },
                "seq" : [ "state", "level" ]
            }
        },

        commands : {
            'SROF' : {
                "state" : { write : "DIGITAL", heldHigh : false, "high" : "ON", "low" : "OFF"  },
                "send" : [ 'state', 'ctrlValue' ]
            }
        },

        translates : {
            "water" : { "key" : "PUMP", "state" : "dir", "static" : { "state" : "ON" },
                        "convert" : { "rate" : "amount", "op" : "rateamout", "fixed" : { "level" : { "OFF" : 0 } } } },
            "inoculum" : { "key" : "PUMP", "state" : "dir", "static" : { "state" : "ON" },
                           "convert" : { "rate" : "amount", "op" : "rateamout", "fixed" : { "level" : { "OFF" : 0 } } }  },
            "mixer" : { "key" : "PUMP", "state" : "dir", "static" : { "state" : "OFF" },
                        "convert" : { "rate" : "amount", "op" : "rateamout",  "fixed" : { "level" : { "OFF" : 0 } } } },
            "extraction" : { "key" : "PUMP", "state" : "dir", "static" : { "state" : "OFF" },
                             "convert" : { "rate" : "amount", "op" : "rateamout", "fixed" : { "level" : { "OFF" : 0 } } } },
            "Heater" : { "key" : "HEAT" },
            "Air" : { "key" : "AIRS" },
            "SensorOnOff" : { "key" : "SROF" },
            "set-time" : { "key" : "STIME" },
            "stepper" : { "key" : "STEP" },
            "Lamp" : { "key" : "LAMP" }
        },
        "on-module-commands" : {
            "commands" : ["SREQ","LIMT","STME","SROF","LTST","LAMP","PUMP","AIRS","HEAT","STEP"],
            "parameters" : ["qry","state","delay","level","strt","stp","sens","HIGH","LOW","year","mo","day","mins","dir"],
            "keywords" :  ["cmd:","OD","temperature","ALL","OFF","ON","HIGH","LOW"],
        },
        "parameter-translates" : {
            "query" : "qry",
            "state" : "state",
            "delay" : "delay",
            "level" : "level",
            "start" : "strt",
            "stop" : "stp",
            "sensor" : "sens",
            "hight" : "HIGH",
            "low" : "LOW",
            "year" : "year",
            "month" : "mo",
            "day" : "day",
            "minutes" : "mins",
            "direction" : "dir",
            "ctrlValue" :"delay"
        }

    },

    hardwarePins : {},

    serial : {

        testing : false,

        uarts : [{
            port : "/dev/ttyUSB0",
            // port : "/dev/cu.usbmodem14201",
            baud : 9600,
            mcu : "Prime1"
        },
        {
            port : "/dev/ttyUSB1",
            baud : 9600,
            mcu : "MV1"
        },
        {
            port : "/dev/ttyUSB2",
            baud : 9600,
            mcu : "Prime2"
        },
        {
            port : "/dev/ttyUSB3",
            baud : 9600,
            mcu : "MV2"
        }]

    }

}




/*
// { writeD : {pin:14, value:1} }
// { writeA : {pin:14, value:255} }
*/
