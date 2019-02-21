var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var MeasurementSchema = mongoose.Schema({
  time: {
    type: String,
    index:true
  },
  reaction : {
    type: String, //mongoose.Schema.Types.ObjectId,
    //ref: 'Reaction',
    required: true},
  point: { type :mongoose.Schema.Types.Mixed }
});


//Mongoose automatically creates a collection that pluralizes the model name reaction->reactions
var Measurements = module.exports = mongoose.model('Measurements', MeasurementSchema);
