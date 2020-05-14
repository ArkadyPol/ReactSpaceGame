import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Saves from "./Saves.jsx";
import { changeSaveName } from "../redux/actions.js";
const Form = ({ handleSubmit }) => {
  const saves = useSelector((state) => state.saves.saves);
  const saveName = useSelector((state) => state.saves.saveName);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(changeSaveName(e.target.textContent));
  };
  return (
    <form className="save" onSubmit={handleSubmit}>
      <Saves handleClick={handleClick} saves={saves} />
      <input
        style={{ width: 133 }}
        type="text"
        onChange={(e) => dispatch(changeSaveName(e.target.value))}
        value={saveName || ""}
      />
      <button id="save" type="submit" onClick={handleSubmit}>
        Сохранить
      </button>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
