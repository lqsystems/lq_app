const { readFile, writeFile } = require('./scriptUtils');
const { backendModelsDir, sharedConfigDir } = require('./scriptConfig');

const dosisModsFileName = 'dosisMods';
const dosisModsFileHandle = `${backendModelsDir}/${dosisModsFileName}.json`;

const getExportText = (exportObject, objectName) => {
  const exportStatement = 'export const';
  return `${exportStatement} ${objectName} = ${exportObject}`;
};

const logContents = (text) => {
  const dosisModsExport = getExportText(text, dosisModsFileName);
  writeFile(`${sharedConfigDir}/${dosisModsFileName}.js`, dosisModsExport);
};

readFile(dosisModsFileHandle, logContents);
