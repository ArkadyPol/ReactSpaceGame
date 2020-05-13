import React from "react";
const Saves = (props) => {
  let buttons = props.saves.map((save) => (
    <button key={save} className="save-button" onClick={props.handleClick}>
      {save}
    </button>
  ));
  return (
    <div style={props.style} className="save-overflow">
      {buttons}
    </div>
  );
};
export default Saves;
