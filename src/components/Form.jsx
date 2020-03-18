import React from "react";
import Saves from "./Saves.jsx";
function Form(props) {
  let display = props.display ? "block" : "none";
  return (
    <form className="save" style={{ display }} onSubmit={props.handleSubmit}>
      <Saves handleClick={props.handleClick} saves={props.saves} />
      <input
        style={{ width: 133 }}
        type="text"
        onChange={props.handleChange}
        value={props.input}
      />
      <button id="save" type="submit" onClick={props.handleSubmit}>
        Сохранить
      </button>
    </form>
  );
}

export default Form;
