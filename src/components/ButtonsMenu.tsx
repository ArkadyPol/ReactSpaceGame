import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@reach/router';
import { toggleDisplay, reset } from '../redux/actions';

const ButtonsMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        id="newGame"
        className="button"
        type="button"
        onClick={(): void => {
          setTimeout(() => {
            dispatch(reset());
            void navigate('/game');
          }, 50);
        }}
      >
        Новая игра
      </button>
      <button
        id="loadGame"
        className="button"
        type="button"
        onClick={(): void => {
          dispatch(toggleDisplay(true));
        }}
      >
        Загрузить игру
      </button>
    </>
  );
};
export default ButtonsMenu;
