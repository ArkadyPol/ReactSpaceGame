import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSave } from '../redux/actions';

type Style = {
  left: number;
  top: number;
  position: 'static' | 'absolute';
};

type Props = {
  saves: string[];
  handleClick: (e: React.MouseEvent) => void;
  style?: Style;
};

const Saves: React.FC<Props> = ({
  saves,
  handleClick,
  style = { left: 0, top: 0, position: 'static' },
}) => {
  const dispatch = useDispatch();
  const buttons = saves.map((save) => (
    <div key={save}>
      <button type="button" className="save-button" onClick={handleClick}>
        {save}
      </button>
      <button
        type="button"
        className="save-delete"
        onClick={() => dispatch(deleteSave(save))}
      >
        X
      </button>
    </div>
  ));
  return (
    <div style={style} className="save-overflow">
      {buttons}
    </div>
  );
};

export default Saves;
