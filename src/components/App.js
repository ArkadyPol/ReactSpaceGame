import React, { Component } from "react";
import Shot from "./Shot.js";
import Rocket from "./Rocket";
import "../styles/App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rocketX: 704,
      shots: [],
      arrowLeft: false,
      arrowRight: false,
      space: false,
      readyToShoot: true,
      velocity: 0
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    this.timerID = setInterval(() => this.updatePerFrame(), 25);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    clearInterval(this.timerID);
  }
  updatePerFrame() {
    let shots = this.state.shots
      .map(coords => [coords[0], coords[1] - 4])
      .filter(coords => coords[1] > 0);
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
    this.setState({ shots, rocketX, readyToShoot, velocity });
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
    return (
      <svg width={width} height={height}>
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
export default App;
