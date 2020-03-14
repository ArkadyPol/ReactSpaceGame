const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/dist/game.html");
});
app.get("/save", (req, res) => {
  res.json(loadSave(req.query));
});
app.get("/saves", (req, res) => {
  res.json(getSaves());
});
app.post("/saves", (req, res) => {
  createSave(req.body);
  res.end();
});
app.listen(3000, () => {
  console.log("Port 3000 listen");
});
function getSaves() {
  let saves = fs.readdirSync("saves", "utf8");
  saves = saves
    .sort((a, b) => getTime(`saves/${b}`) - getTime(`saves/${a}`))
    .map(file => file.split(".")[0]);
  return saves;
}
function loadSave(query) {
  let save = JSON.parse(fs.readFileSync(`saves/${query.save}.json`, "utf8"));
  return save;
}
function createSave(save) {
  let name = save.input;
  fs.writeFileSync(`saves/${name}.json`, JSON.stringify(save, null, 4));
}
function getTime(path) {
  let stats = fs.statSync(path);
  return stats.mtime;
}
