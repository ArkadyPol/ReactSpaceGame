import React, { useRef, useEffect, useState } from "react";
import Saves from "./Saves.jsx";
import Buttons from "./Buttons.jsx";
import star from "../canvas/Star.js";
import stars from "../Stars.json";
import { getSaves } from "../logic.js";
import { useSelector, useDispatch } from "react-redux";
import { toggleDisplay } from "../redux/actions.js";
import "../styles/App.css";

function MainMenu() {
  const displayForm = useSelector(state => state);
  const dispatch = useDispatch();
  const [saves, setSaves] = useState([]);
  const width = 1184;
  const height = 740;
  const canvas = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillRect(0, 0, width, height);
    stars.forEach(params => star(ctx, params));
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code == "Escape") {
        dispatch(toggleDisplay(false));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  function handleClickForm(e) {
    let save = e.target.textContent;
    window.location.href = `/game?save=${save}`;
  }
  useEffect(() => {
    getSaves(setSaves);
  }, []);
  return (
    <React.Fragment>
      <canvas ref={canvas} width={width} height={height} />
      {!displayForm && <Buttons />}
      {displayForm && (
        <Saves
          style={{ left: 482, top: 220, position: "absolute" }}
          saves={saves}
          handleClick={handleClickForm}
        />
      )}
    </React.Fragment>
  );
}

export default MainMenu;
