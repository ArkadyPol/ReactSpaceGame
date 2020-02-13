import React, { Component } from "react";
import Shot from "./Shot.js";
import Star from "./Star.js";
import Rocket from "./Rocket";
import "../styles/App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rocketX: 592,
      shots: [],
      arrowLeft: false,
      arrowRight: false,
      space: false,
      readyToShoot: true,
      velocity: 0,
      stars: []
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    this.timerID = setInterval(() => this.updatePerFrame(), 25);
    this.timerStars = setInterval(() => this.generateNewStars(), 250);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    clearInterval(this.timerID);
    clearInterval(this.timerStars);
  }
  updatePerFrame() {
    let shots = this.state.shots
      .map(coords => [coords[0], coords[1] - 4])
      .filter(coords => coords[1] > 0);
    let stars = this.state.stars
      .map(params => [params[0], params[1] + 1, params[2]])
      .filter(params => params[1] < 750);
    let rocketX = this.state.rocketX;
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
    let readyToShoot = this.state.readyToShoot;
    if (this.state.space && readyToShoot) {
      shots.push([rocketX, 625]);
      readyToShoot = false;
      setTimeout(() => this.setState({ readyToShoot: true }), 100);
    }
    this.setState({ stars, shots, rocketX, readyToShoot, velocity });
  }
  generateNewStars() {
    let quantity = randomInteger(2, 5);
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
    const shots = this.state.shots.map((coords, index) => (
      <Shot key={index} x={coords[0]} y={coords[1]} />
    ));
    const stars = this.state.stars.map((params, index) => (
      <Star key={index} x={params[0]} y={params[1]} size={params[2]} />
    ));
    return (
      <svg width={width} height={height}>
        {stars}
        {shots}
        <Rocket x={this.state.rocketX} />
      </svg>
    );
  }
}
function calculateVelocity({ velocity, arrowLeft, arrowRight }) {
  if (Math.abs(velocity) < 0.15) velocity = 0;
  if (velocity > 0) velocity -= 0.15;
  if (velocity < 0) velocity += 0.15;
  if (arrowLeft) {
    velocity -= 0.4;
  }
  if (arrowRight) {
    velocity += 0.4;
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
  let percent = randomInteger(0, 99);
  let size;
  if (percent < 25) size = 2;
  else if (percent < 45) size = 3;
  else if (percent < 62) size = 4;
  else if (percent < 77) size = 5;
  else if (percent < 90) size = 6;
  else size = 7;
  return [x, y, size];
}
export default App;
