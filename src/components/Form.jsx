import React, { Component } from "react";
class Form extends Component {
  render() {
    let display = this.props.display ? "block" : "none";
    return (
      <form className="save" style={{ display }}>
        <div className="save-overflow">
          <button className="save-button">1</button>
          <button className="save-button">2</button>
          <button className="save-button">3</button>
        </div>
        <input style={{ width: 133 }} type="text" />
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}
export default Form;
