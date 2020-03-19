import React from "react";
import { useDispatch } from "react-redux";
import { toggleDisplay } from "../redux/actions.js";
function Buttons(props) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <button
        id="newGame"
        className="button"
        onClick={() => {
          window.location.href = "/game";
        }}
      >
        Новая игра
      </button>
      <button
        id="loadGame"
        className="button"
        onClick={() => dispatch(toggleDisplay(true))}
      >
        Загрузить игру
      </button>
    </React.Fragment>
  );
}
export default Buttons;
