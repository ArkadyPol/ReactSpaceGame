import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import {
  reset,
  toggleDisplay,
  ToggleDisplayActionType,
} from "../redux/actions";

const ButtonsMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        id="saveGame"
        className="button"
        type="button"
        onClick={(): ToggleDisplayActionType => dispatch(toggleDisplay(true))}
      >
        Сохранить игру
      </button>
      <button
        id="returnBack"
        className="button"
        type="button"
        onClick={(): void => {
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
