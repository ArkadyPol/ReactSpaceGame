import React, { Component } from "react";
import star from "./Star.js";
import stars from "../Stars.json";
import "../styles/App.css";
class Menu extends Component {
  componentDidMount() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillStyle = "#09011a";
    ctx.fillRect(0, 0, 1184, 740);
    stars.forEach(params => star(ctx, params));
  }
  render() {
    const width = 1184;
    const height = 740;
    return <canvas ref="canvas" width={width} height={height} />;
  }
}
export default Menu;
