import React, { useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import Saves from "./Saves.jsx";
import Buttons from "./Buttons.jsx";
import star from "../canvas/Star.js";
import stars from "../Stars.json";
import { toggleDisplay, getSaves } from "../redux/actions.js";
import "../styles/App.css";

function MainMenu() {
  const displayForm = useSelector(state => state.display);
  const saves = useSelector(state => state.saves);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      if (e.code == "Escape" && displayForm) {
        dispatch(toggleDisplay(false));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [displayForm]);
  function handleClickForm(e) {
    let save = e.target.textContent;
    navigate(`/game?save=${save}`);
  }
  useEffect(() => {
    dispatch(getSaves());
  }, []);
  return (
    <Fragment>
      <canvas ref={canvas} width={width} height={height} />
      {!displayForm && <Buttons />}
      {displayForm && (
        <Saves
          style={{ left: 482, top: 220, position: "absolute" }}
          saves={saves}
          handleClick={handleClickForm}
        />
      )}
    </Fragment>
  );
}

export default MainMenu;
