import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import { reset } from "../redux/actions";
import { toggleDisplay } from "../redux/actions.js";
function ButtonsMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Fragment>
      <button
        id="saveGame"
        className="button"
        onClick={() => dispatch(toggleDisplay(true))}
        /*onClick={() => {
          dispatch(startNewGame());
          navigate("/game");
        }}*/
      >
        Сохранить игру
      </button>
      <button
        id="returnBack"
        className="button"
        onClick={() => {
          navigate("/");
          dispatch(reset());
        }}
      >
        Вернуться в главное меню
      </button>
    </Fragment>
  );
}
export default ButtonsMenu;
