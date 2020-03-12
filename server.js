const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static(__dirname + "/dist"));
app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/dist/game.html");
});
app.get("/saves", (req, res) => {
  getSaves();
  res.end();
});
app.listen(3000, () => {
  console.log("Port 3000 listen");
});
function getSaves() {
  let saves = fs.readdirSync("saves", "utf8");
  console.log(saves);
}
