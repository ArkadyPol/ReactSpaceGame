import React, { Component } from "react";
import shot from "./Shot.js";
import star from "./Star.js";
import rocket from "./Rocket.js";
import shotMagazine from "./ShotMagazine.js";
import healthBar from "./HealthBar.js";
import initialState from "../InitialState.json";
import stars from "../Stars.json";
import "../styles/App.css";
class Game extends Component {
  constructor(props) {
    super(props);
    let state = initialState;
    state.stars = stars;
    this.state = state;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    runTimers.call(this);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    stopTimers.call(this);
  }
  updatePerFrame() {
    let shots = this.state.shots
      .map(coords => [coords[0], coords[1] - 4])
      .filter(coords => coords[1] > 0);
    let stars = this.state.stars
      .map(params => [params[0], params[1] + 1, params[2]])
      .filter(params => params[1] < 750);
    let { rocketX, readyToShoot, shotMagazine, space } = this.state;
    let velocity = calculateVelocity(this.state);
    rocketX += velocity;
    if (rocketX < 15) {
      rocketX = 15;
      velocity = 0;
    }
    if (rocketX > 1169) {
      rocketX = 1169;
      velocity = 0;
    }
    if (space && readyToShoot && shotMagazine > 0) {
      shots.push([rocketX, 625]);
      readyToShoot = false;
      shotMagazine -= 1;
      setTimeout(() => this.setState({ readyToShoot: true }), 100);
    }
    let fps = this.state.fps + 1;
    this.setState({
      stars,
      shots,
      rocketX,
      readyToShoot,
      velocity,
      fps,
      shotMagazine
    });
    const ctx = this.refs.canvas.getContext("2d");
    updateCanvas(ctx, this.state);
  }
  generateNewStars() {
    let quantity = randomInteger(2, 7);
    let stars = this.state.stars.map(params => [
      params[0],
      params[1],
      params[2]
    ]);
    for (let i = 0; i < quantity; i++) {
      stars.push(generateStar());
    }
    this.setState({ stars });
  }
  runFPS() {
    console.log("fps", this.state.fps);
    let shotMagazine = this.state.shotMagazine;
    if (shotMagazine < 10) {
      shotMagazine += 1;
    }
    this.setState({ fps: 0, shotMagazine });
  }
  handleKeyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.setState({ arrowLeft: true });
        break;
      case "ArrowRight":
        this.setState({ arrowRight: true });
        break;
      case "Space":
        this.setState({ space: true });
        break;
      case "Escape":
        stopTimers.call(this);
        break;
    }
  }
  handleKeyUp(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.setState({ arrowLeft: false });
        break;
      case "ArrowRight":
        this.setState({ arrowRight: false });
        break;
      case "Space":
        this.setState({ space: false });
        break;
    }
  }
  render() {
    const width = 1184;
    const height = 740;
    return <canvas ref="canvas" width={width} height={height} />;
  }
}
function calculateVelocity({ velocity, arrowLeft, arrowRight }) {
  if (Math.abs(velocity) < 0.14) velocity = 0;
  if (velocity > 0) velocity -= 0.14;
  if (velocity < 0) velocity += 0.14;
  if (arrowLeft) {
    velocity -= 0.36;
  }
  if (arrowRight) {
    velocity += 0.36;
  }
  return velocity;
}
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function generateStar() {
  let x = randomInteger(8, 1176);
  let y = randomInteger(-10, -19);
  let percent = randomInteger(0, 199);
  let size;
  if (percent < 81) size = 2;
  else if (percent < 130) size = 3;
  else if (percent < 160) size = 4;
  else if (percent < 178) size = 5;
  else if (percent < 189) size = 6;
  else if (percent < 196) size = 7;
  else size = 8;
  return [x, y, size];
}
function updateCanvas(ctx, state) {
  ctx.clearRect(0, 0, 1184, 740);
  ctx.fillStyle = "#09011a";
  ctx.fillRect(0, 0, 1184, 740);
  state.stars.forEach(params => star(ctx, params));
  state.shots.forEach(coords => shot(ctx, coords));
  rocket(ctx, state.rocketX);
  shotMagazine(ctx, state.shotMagazine);
  healthBar(ctx, state.health);
}

function runTimers() {
  this.timerID = setInterval(() => this.updatePerFrame(), 25);
  this.timerStars = setInterval(() => this.generateNewStars(), 300);
  this.timerFPS = setInterval(() => this.runFPS(), 1000);
}
function stopTimers() {
  clearInterval(this.timerID);
  clearInterval(this.timerStars);
  clearInterval(this.timerFPS);
}
export default Game;
