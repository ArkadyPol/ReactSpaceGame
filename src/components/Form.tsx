import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Saves from './Saves';
import { changeSaveName, ChangeSaveNameAction } from '../redux/actions';
import { RootState } from '../redux/reducers';

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
};

const Form: React.FC<Props> = ({ handleSubmit }) => {
  const saves = useSelector((state: RootState) => state.saves.saves);
  const saveName = useSelector((state: RootState) => state.saves.saveName);
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
        onChange={(e): ChangeSaveNameAction =>
          dispatch(changeSaveName(e.target.value))
        }
        value={saveName}
      />
      <button id="save" type="submit">
        Сохранить
      </button>
    </form>
  );
};

export default Form;
