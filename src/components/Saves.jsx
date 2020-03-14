import React, { Component } from "react";
class Saves extends Component {
  render() {
    let buttons = this.props.saves.map(save => (
      <button
        key={save}
        className="save-button"
        onClick={this.props.handleClick}
      >
        {save}
      </button>
    ));
    return (
      <div style={this.props.style} className="save-overflow">
        {buttons}
      </div>
    );
  }
}
export default Saves;
