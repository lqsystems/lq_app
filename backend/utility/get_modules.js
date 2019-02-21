//Mongo Database
var mongo = require('mongodb'),
    mongoose = require('mongoose');
var fs = require('fs')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/loginark');
var db = mongoose.connection;


var Modules = require('../models/modules');


Modules.find({},(err, modules) => {
                 var userAssetsMods = {}
                 modules.forEach( mm => {
                                      userAssetsMods[mm.name] = {}
                                  });
                 fs.writeFileSync("dosisMods.json",JSON.stringify(userAssetsMods,null,2))
                 process.exit(0);
              });
