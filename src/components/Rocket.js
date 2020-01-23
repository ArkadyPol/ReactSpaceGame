import React, { Component } from "react";
class Rocket extends Component {
  render() {
    const x = this.props.x;
    return (
      <React.Fragment>
        <ellipse cx={x} cy="440" rx="12" ry="37" fill="#ff0000" />
        <circle cx={x} cy="420" r="5" fill="#ffff00" />
        <circle cx={x} cy="440" r="5" fill="#ffff00" />
        <circle cx={x} cy="460" r="5" fill="#ffff00" />
        <path
          d={`M${x - 7} 470 q -10 10 -10 20 q 0 -10 14 -16 Q ${x - 4} 475 ${x -
            7} 470`}
          fill="#ffff00"
        />
        <path
          d={`M${x + 7} 470 q 10 10 10 20 q 0 -10 -14 -16 Q ${x + 4} 475 ${x +
            7} 470`}
          fill="#ffff00"
        />
      </React.Fragment>
    );
  }
}
export default Rocket;