import React, { Component } from "react";
class Form extends Component {
  render() {
    let display = this.props.display ? "block" : "none";
    let buttons = this.props.saves.map(save => (
      <button key={save} className="save-button">
        {save}
      </button>
    ));
    return (
      <form className="save" style={{ display }}>
        <div className="save-overflow">{buttons}</div>
        <input style={{ width: 133 }} type="text" />
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
export default Form;
