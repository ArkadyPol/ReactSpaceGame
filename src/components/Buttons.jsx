import React from "react";
function Buttons(props) {
  return (
    <React.Fragment>
      <button
        id="newGame"
        className="button"
        onClick={() => {
          window.location.href = "/game";
        }}
      >
        Новая игра
      </button>
      <button id="loadGame" className="button" onClick={props.handleClick}>
        Загрузить игру
      </button>
    </React.Fragment>
  );
}
export default Buttons;
