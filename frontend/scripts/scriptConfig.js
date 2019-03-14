const path = require('path');

const backendModelsDir = path.join(__dirname, '../../backend/models');
const sharedConfigDir = path.join(__dirname, '../src/shared_config');

module.exports = {
  backendModelsDir,
  sharedConfigDir,
};
