import React, { Component } from "react";
import star from "./Star.js";
import stars from "../Stars.json";
import "../styles/App.css";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = "#09011a";
    ctx.fillRect(0, 0, 1184, 740);
    stars.forEach(params => star(ctx, params));
    let newGame = this.refs.newGame;
    newGame.style.top = 370 - newGame.clientHeight / 2 + "px";
    newGame.style.left = 592 - newGame.clientWidth / 2 + "px";
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
        <button className="button" ref="newGame" onClick={this.handleClick}>
        Новая игра
      </button>
      </React.Fragment>
    );
  }
}
export default Menu;
