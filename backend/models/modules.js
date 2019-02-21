var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var ModuleSchema = mongoose.Schema({
  name: {
    type: String,
    index:true
  },
  interface : { type :mongoose.Schema.Types.Mixed },
  hardware: { type :mongoose.Schema.Types.Mixed }
});


//Mongoose automatically creates a collection that pluralizes the model name reaction->reactions
var Modules = module.exports = mongoose.model('Modules', ModuleSchema);
