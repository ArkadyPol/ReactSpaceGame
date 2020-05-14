import React from "react";
import PropTypes from "prop-types";

const Saves = ({ saves, handleClick, style }) => {
  let buttons = saves.map((save) => (
    <button key={save} className="save-button" onClick={handleClick}>
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
  saves: PropTypes.arrayOf(PropTypes.string),
  handleClick: PropTypes.func.isRequired,
  style: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    position: PropTypes.string,
  }),
};

export default Saves;
