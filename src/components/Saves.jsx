import React from "react";
import PropTypes from "prop-types";

const Saves = ({ saves, handleClick, style }) => {
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

Saves.propTypes = {
  saves: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  style: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    position: PropTypes.string,
  }),
};

Saves.defaultProps = {
  style: { left: 0, top: 0, position: "static" },
};

export default Saves;
