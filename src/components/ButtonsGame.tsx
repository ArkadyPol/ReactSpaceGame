import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '@reach/router';
import { toggleDisplay, ToggleDisplayAction } from '../redux/actions';
import { RootState } from '../redux/reducers';

const ButtonsMenu: React.FC = () => {
  const locale = useSelector((state: RootState) => state.lang.currentLang);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        id="saveGame"
        className="button"
        type="button"
        onClick={(): ToggleDisplayAction => dispatch(toggleDisplay(true))}
      >
        {locale.saveGame}
      </button>
      <button
        id="returnBack"
        className="button"
        type="button"
        onClick={(): void => {
          void navigate('/');
        }}
      >
        {locale.returnBack}
      </button>
    </>
  );
};
export default ButtonsMenu;
