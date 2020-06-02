import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '@reach/router';
import { toggleDisplay, reset } from '../redux/actions';
import { RootState } from '../redux/reducers';

const ButtonsMenu: React.FC = () => {
  const locale = useSelector((state: RootState) => state.lang.currentLang);
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
        {locale.newGame}
      </button>
      <button
        id="loadGame"
        className="button"
        type="button"
        onClick={(): void => {
          dispatch(toggleDisplay(true));
        }}
      >
        {locale.loadGame}
      </button>
    </>
  );
};
export default ButtonsMenu;
