const fs = require('fs');

const getTime = (pathToFile) => {
  const stats = fs.statSync(pathToFile);
  return stats.mtime;
};

exports.getSaves = () => {
  let saves = fs.readdirSync('saves', 'utf-8');
  saves = saves
    .sort((a, b) => getTime(`saves/${b}`) - getTime(`saves/${a}`))
    .map((file) => file.split('.')[0]);
  return saves;
};
exports.loadSave = (saveName) => {
  const save = JSON.parse(
    fs.readFileSync(`saves/${saveName.name}.json`, 'utf-8')
  );
  return save;
};
exports.createSave = (save) => {
  const name = save.saveName;
  fs.writeFileSync(`saves/${name}.json`, JSON.stringify(save.game, null, 4));
};
exports.deleteSave = (saveName) => {
  fs.unlinkSync(`saves/${saveName}.json`);
};
