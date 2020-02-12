import React, { Component } from "react";
class Rocket extends Component {
  render() {
    const x = this.props.x;
    return (
      <React.Fragment>
        <ellipse cx={x} cy="665" rx="12" ry="37" fill="#ff0000" />
        <circle cx={x} cy="645" r="5" fill="#ffff00" />
        <circle cx={x} cy="665" r="5" fill="#ffff00" />
        <circle cx={x} cy="685" r="5" fill="#ffff00" />
        <path
          d={`M${x - 7} 695 q -10 10 -10 20 q 0 -10 14 -16 Q ${x - 4} 700 ${x -
            7} 695`}
          fill="#ffff00"
        />
        <path
          d={`M${x + 7} 695 q 10 10 10 20 q 0 -10 -14 -16 Q ${x + 4} 700 ${x +
            7} 695`}
          fill="#ffff00"
        />
      </React.Fragment>
    );
  }
}
export default Rocket;