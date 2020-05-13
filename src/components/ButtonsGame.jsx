import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import { reset } from "../redux/actions";
import { toggleDisplay } from "../redux/actions.js";
const ButtonsMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        id="saveGame"
        className="button"
        onClick={() => dispatch(toggleDisplay(true))}
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
    </>
  );
};
export default ButtonsMenu;
