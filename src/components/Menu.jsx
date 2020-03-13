import React, { Component } from "react";
import star from "../canvas/Star.js";
import stars from "../Stars.json";
import "../styles/App.css";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saves: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
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
  handleClick() {
    window.location.href = "/game";
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
      </React.Fragment>
    );
  }
}
export default Menu;
