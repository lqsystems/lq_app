var mongoose = require('mongoose');

//Reaction Schema
var ReactionSchema = mongoose.Schema({
  user: {
   id: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   name: {
     type: String,
     required: true
   }
  },
  created: {
    type: Date,
    "default": Date.now
  },
  name: {
    type: String
  },
  module: {
    type: String
  },
  media: [{
    type: String
  }],
  procedure: [{
    type: String
  }],
  notes: [{
    type: String
  }],

  Datalog: [{
    type :mongoose.Schema.Types.Mixed
  }],

  ModuleState : { type :mongoose.Schema.Types.Mixed },

  active : {
    type: Boolean,
    required: true
  }

});

//Mongoose automatically creates a collection that pluralizes the model name reaction->reactions
var Reaction = module.exports = mongoose.model('Reaction', ReactionSchema);
