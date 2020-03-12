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
app.listen(3000, () => {
  console.log("Port 3000 listen");
});
function getSaves() {
  let saves = fs.readdirSync("saves", "utf8");
  saves = saves.map(file => file.split(".")[0]);
  return saves;
}
