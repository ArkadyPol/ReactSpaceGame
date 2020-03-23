import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Saves from "./Saves.jsx";
import { changeSaveName } from "../redux/actions.js";
function Form(props) {
  const saves = useSelector(state => state.saves.saves);
  const saveName = useSelector(state => state.saves.saveName);
  const dispatch = useDispatch();
  function handleClick(e) {
    dispatch(changeSaveName(e.target.textContent));
  }
  return (
    <form className="save" onSubmit={props.handleSubmit}>
      <Saves handleClick={handleClick} saves={saves} />
      <input
        style={{ width: 133 }}
        type="text"
        onChange={e => dispatch(changeSaveName(e.target.value))}
        value={saveName || ""}
      />
      <button id="save" type="submit" onClick={props.handleSubmit}>
        Сохранить
      </button>
    </form>
  );
}

export default Form;
