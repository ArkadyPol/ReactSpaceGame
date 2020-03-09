const express = require("express");
const app = express();
app.use(express.static(__dirname + "/dist"));
app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/dist/game.html");
});
app.listen(3000, () => {
  console.log("Port 3000 listen");
});
