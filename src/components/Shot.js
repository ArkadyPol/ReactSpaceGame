import React, { Component } from "react";
class Shot extends Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    return <circle cx={x} cy={y} r="5" fill="#00af00" />;
  }
}
export default Shot;