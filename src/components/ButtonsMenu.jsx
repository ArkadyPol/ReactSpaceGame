import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import { toggleDisplay } from "../redux/actions";

const ButtonsMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        id="newGame"
        className="button"
        type="button"
        onClick={() => {
          setTimeout(() => {
            navigate("/game");
          }, 50);
        }}
      >
        Новая игра
      </button>
      <button
        id="loadGame"
        className="button"
        type="button"
        onClick={() => dispatch(toggleDisplay(true))}
      >
        Загрузить игру
      </button>
    </>
  );
};
export default ButtonsMenu;
