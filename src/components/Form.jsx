import React, { Component } from "react";
class Form extends Component {
  render() {
    let display = this.props.display ? "block" : "none";
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
      <form
        className="save"
        style={{ display }}
        onSubmit={this.props.handleSubmit}
      >
        <div className="save-overflow">{buttons}</div>
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
