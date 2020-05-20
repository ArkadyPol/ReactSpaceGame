import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Saves from "./Saves";
import { changeSaveName, ChangeSaveNameActionType } from "../redux/actions";
import { RootStateType } from "../redux/reducers";

type PropsType = {
  handleSubmit: () => void;
};

const Form: React.FC<PropsType> = ({ handleSubmit }) => {
  const saves = useSelector((state: RootStateType) => state.saves.saves);
  const saveName = useSelector((state: RootStateType) => state.saves.saveName);
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent): void => {
    const target = e.currentTarget;
    dispatch(changeSaveName(target.textContent as string));
  };
  return (
    <form className="save" onSubmit={handleSubmit}>
      <Saves handleClick={handleClick} saves={saves} />
      <input
        style={{ width: 133 }}
        type="text"
        onChange={(e): ChangeSaveNameActionType =>
          dispatch(changeSaveName(e.target.value))
        }
        value={saveName}
      />
      <button id="save" type="submit" onClick={handleSubmit}>
        Сохранить
      </button>
    </form>
  );
};

export default Form;
