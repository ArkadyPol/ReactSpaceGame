import React, { Component } from "react";
class Star extends Component {
  render() {
    const { x, y, size } = this.props;
    return (
      <path
        d={`M${x -
          size} ${y} q ${size} 0 ${size} ${-size} q 0 ${size} ${size} ${size} q ${-size} 0 
          ${-size} ${size} q 0 ${-size} ${-size} ${-size}`}
        fill="#ffffff"
      />
    );
  }
}
export default Star;
