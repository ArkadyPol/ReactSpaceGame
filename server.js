const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static(__dirname + "/dist"));
app.use(express.json());
app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/dist/game.html");
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
  saves = saves.map(file => file.split(".")[0]);
  return saves;
}
function createSave(save) {
  let name = save.save.input;
  fs.writeFileSync(`saves/${name}.json`, JSON.stringify(save, null, 4));
}
