import React, { Component } from "react";
import Saves from "./Saves.jsx";
class Form extends Component {
  render() {
    let display = this.props.display ? "block" : "none";
    return (
      <form
        className="save"
        style={{ display }}
        onSubmit={this.props.handleSubmit}
      >
        <Saves handleClick={this.props.handleClick} saves={this.props.saves} />
        <input
          style={{ width: 133 }}
          type="text"
          onChange={this.props.handleChange}
          value={this.props.input}
        />
        <button id="save" type="submit" onClick={this.props.handleSubmit}>
          Сохранить
        </button>
      </form>
    );
  }
}
export default Form;
