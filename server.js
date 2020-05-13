const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.get("/newGame", (req, res) => {
  res.json(newGame());
});
app.post("/save", (req, res) => {
  res.json(loadSave(req.body));
});
app.get("/saves", (req, res) => {
  res.json(getSaves());
});
app.post("/saves", (req, res) => {
  createSave(req.body);
  res.end();
});
app.get("/*", (req, res) => {
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Port 3000 listen");
});
const getSaves = () => {
  let saves = fs.readdirSync("saves", "utf-8");
  saves = saves
    .sort((a, b) => getTime(`saves/${b}`) - getTime(`saves/${a}`))
    .map((file) => file.split(".")[0]);
  return saves;
};
const newGame = () => {
  const game = JSON.parse(
    fs.readFileSync("src/initial_state/game.json", "utf-8")
  );
  return game;
};
const loadSave = (saveName) => {
  const save = JSON.parse(
    fs.readFileSync(`saves/${saveName.name}.json`, "utf-8")
  );
  return save;
};
const createSave = (save) => {
  const name = save.saveName;
  fs.writeFileSync(`saves/${name}.json`, JSON.stringify(save.game, null, 4));
};
const getTime = (path) => {
  const stats = fs.statSync(path);
  return stats.mtime;
};
