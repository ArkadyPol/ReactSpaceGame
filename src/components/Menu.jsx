import React, { Component } from "react";
import Saves from "./Saves.jsx";
import star from "../canvas/Star.js";
import stars from "../Stars.json";
import "../styles/App.css";
import { getSaves } from "../logic.js";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saves: [],
      displayForm: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = "#09011a";
    ctx.fillRect(0, 0, 1184, 740);
    stars.forEach(params => star(ctx, params));
    let newGame = this.refs.newGame;
    let { width, height } = newGame.getBoundingClientRect();
    newGame.style.top = 247 - height / 2 + "px";
    newGame.style.left = 592 - width / 2 + "px";
    let loadGame = this.refs.loadGame;
    {
      let { width, height } = loadGame.getBoundingClientRect();
      loadGame.style.top = 493 - height / 2 + "px";
      loadGame.style.left = 592 - width / 2 + "px";
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.code == "Escape") {
      this.refs.newGame.style.display = "block";
      this.refs.loadGame.style.display = "block";
      this.setState({ displayForm: false });
    }
  }
  handleClick(e) {
    switch (e.target.id) {
      case "newGame":
        window.location.href = "/game";
        break;
      case "loadGame":
        this.refs.newGame.style.display = "none";
        this.refs.loadGame.style.display = "none";
        getSaves.call(this);
        break;
    }
  }
  handleClickForm(e) {
    let save = e.target.textContent;
    window.location.href = `/game?save=${save}`;
  }
  render() {
    const width = 1184;
    const height = 740;
    return (
      <React.Fragment>
        <canvas ref="canvas" width={width} height={height} />
        <button
          id="newGame"
          className="button"
          ref="newGame"
          onClick={this.handleClick}
        >
          Новая игра
        </button>
        <button
          id="loadGame"
          className="button"
          ref="loadGame"
          onClick={this.handleClick}
        >
          Загрузить игру
        </button>
        {this.state.displayForm && (
          <Saves
            style={{ left: 482, top: 220, position: "absolute" }}
            saves={this.state.saves}
            handleClick={this.handleClickForm}
          />
        )}
      </React.Fragment>
    );
  }
}
export default Menu;
