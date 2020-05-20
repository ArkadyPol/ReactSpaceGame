import React from "react";

type StyleType = {
  left: number;
  top: number;
  position: "static" | "absolute";
};

type PropsType = {
  saves: string[];
  handleClick: () => void;
  style?: StyleType;
};

const Saves: React.FC<PropsType> = ({
  saves,
  handleClick,
  style = { left: 0, top: 0, position: "static" },
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
