import React from 'react';

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
  const buttons = saves.map((save) => (
    <button
      type="button"
      key={save}
      className="save-button"
      onClick={handleClick}
    >
      {save}
    </button>
  ));
  return (
    <div style={style} className="save-overflow">
      {buttons}
    </div>
  );
};

export default Saves;
