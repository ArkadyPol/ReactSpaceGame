import React, { Component } from "react";
import Form from "./Form.jsx";
import initialState from "../InitialState.json";
import stars from "../initial_state/stars.json";
import "../styles/App.css";
import {
  runTimers,
  stopTimers,
  calculateVelocity,
  randomInteger,
  generateStar,
  updateCanvas,
  loadSave,
  generateAsteroid
} from "../logic.js";
import {
  findCollisionsWithRocket,
  findCollisionsWithShots
} from "../collisions.js";
class Game extends Component {
  constructor(props) {
    super(props);
    let state = initialState;
    state.stars = stars;
    let query = window.location.href.split("?")[1];
    if (query != undefined) {
      loadSave.call(this, query);
    }
    this.state = state;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickForm = this.handleClickForm.bind(this);
    this.updatePerFrame = this.updatePerFrame.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    runTimers.call(this);
    let returnBack = this.refs.returnBack;
    let { width, height } = returnBack.getBoundingClientRect();
    returnBack.style.top = 493 - height / 2 + "px";
    returnBack.style.left = 592 - width / 2 + "px";
    returnBack.style.display = "none";
    let saveGame = this.refs.saveGame;
    {
      let { width, height } = saveGame.getBoundingClientRect();
      saveGame.style.top = 247 - height / 2 + "px";
      saveGame.style.left = 592 - width / 2 + "px";
      saveGame.style.display = "none";
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    stopTimers.call(this);
  }
  updatePerFrame() {
    this.requestID = requestAnimationFrame(this.updatePerFrame);
    let shots = this.state.shots
      .map(coords => [coords[0], coords[1] - 5])
      .filter(coords => coords[1] > 0);
    let stars = this.state.stars
      .map(params => [params[0], params[1] + 0.5, params[2]])
      .filter(params => params[1] < 750);
    let asteroids = this.state.asteroids
      .map(params => {
        params.x += params.vX;
        params.y += params.vY;
        return params;
      })
      .filter(params => params.y < 850);
    findCollisionsWithShots(asteroids, shots);
    let {
      rocketX,
      readyToShoot,
      shotMagazine,
      space,
      fps,
      passedPath,
      health
    } = this.state;
    health = findCollisionsWithRocket(asteroids, rocketX, health);
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
    fps += 1;
    if (passedPath % 25 == 0) this.generateNewStars(stars);
    if (passedPath % 75 == 0) {
      if (shotMagazine < 10) {
        shotMagazine += 1;
      }
    }
    if (passedPath % 100 == 0) {
      asteroids.push(generateAsteroid());
    }
    passedPath += 1;
    if (health <= 0) {
      window.location.href = "/";
    }
    this.setState({
      stars,
      shots,
      rocketX,
      readyToShoot,
      velocity,
      fps,
      shotMagazine,
      health,
      passedPath,
      asteroids
    });
    const ctx = this.refs.canvas.getContext("2d");
    updateCanvas(ctx, this.state);
  }
  generateNewStars(stars) {
    let quantity = randomInteger(2, 7);
    for (let i = 0; i < quantity; i++) {
      stars.push(generateStar());
    }
  }
  runFPS() {
    console.log("fps", this.state.fps);
    this.setState({ fps: 0 });
  }
  handleClick(e) {
    switch (e.target.id) {
      case "returnBack":
        window.location.href = "/";
        break;
      case "saveGame":
        this.refs.returnBack.style.display = "none";
        this.refs.saveGame.style.display = "none";
        //getSaves.call(this);
        break;
    }
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
        let escape = this.state.escape;
        if (escape) {
          this.refs.returnBack.style.display = "none";
          this.refs.saveGame.style.display = "none";
          runTimers.call(this);
        } else {
          stopTimers.call(this);
          this.refs.returnBack.style.display = "block";
          this.refs.saveGame.style.display = "block";
          this.setState({ fps: 0 });
        }
        this.setState({ escape: !escape, displayForm: false });
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
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input == "") return;
    if (e.target.id != "save") return;
    let save = this.state;
    save.saves = [];
    save.escape = false;
    save.displayForm = false;
    save.fps = 0;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(save)
    };
    fetch("/saves", options);
    this.setState({ displayForm: false, escape: false });
    runTimers.call(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  handleClickForm(e) {
    this.setState({
      input: e.target.textContent
    });
  }
  render() {
    const width = 1184;
    const height = 740;

    return (
      <React.Fragment>
        <canvas ref="canvas" width={width} height={height} />
        <button
          id="returnBack"
          className="button"
          ref="returnBack"
          onClick={this.handleClick}
        >
          Вернуться в главное меню
        </button>
        <button
          id="saveGame"
          className="button"
          ref="saveGame"
          onClick={this.handleClick}
        >
          Сохранить игру
        </button>
        {this.state.displayForm && (
          <Form
            saves={this.state.saves}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleClick={this.handleClickForm}
            input={this.state.input}
          />
        )}
      </React.Fragment>
    );
  }
}
export default Game;
