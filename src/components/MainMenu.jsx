import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import Saves from "./Saves";
import Buttons from "./ButtonsMenu";
import star from "../canvas/Star";
import { toggleDisplay, getSaves, loadGame } from "../redux/actions";
import "../styles/App.css";

const MainMenu = () => {
  const displayForm = useSelector((state) => state.display);
  const saves = useSelector((state) => state.saves.saves);
  const stars = useSelector((state) => state.game.stars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = 1184;
  const height = 740;
  const canvas = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillRect(0, 0, width, height);
    stars.forEach((params) => star(ctx, params));
  }, [stars]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape" && displayForm) {
        dispatch(toggleDisplay(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [displayForm, dispatch]);
  const handleClickForm = (e) => {
    const save = e.target.textContent;
    dispatch(loadGame(save));
    setTimeout(() => {
      navigate("/game");
    }, 50);
  };
  useEffect(() => {
    dispatch(getSaves());
  }, [dispatch]);
  return (
    <>
      <canvas ref={canvas} width={width} height={height} />
      {!displayForm && <Buttons />}
      {displayForm && (
        <Saves
          style={{ left: 482, top: 220, position: "absolute" }}
          saves={saves}
          handleClick={handleClickForm}
        />
      )}
    </>
  );
};

export default MainMenu;
