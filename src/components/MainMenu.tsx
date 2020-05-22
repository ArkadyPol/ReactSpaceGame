import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import Saves from "./Saves";
import Buttons from "./ButtonsMenu";
import star from "../canvas/star";
import { getStars } from "../redux/selectors";
import { toggleDisplay, sagaGetSaves, sagaLoadGame } from "../redux/actions";
import "../styles/App.css";
import { RootState } from "../redux/reducers";

const MainMenu: React.FC = () => {
  const displayForm = useSelector((state: RootState) => state.display);
  const saves = useSelector((state: RootState) => state.saves.saves);
  const stars = useSelector(getStars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = 1184;
  const height = 740;
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.fillRect(0, 0, width, height);
        stars.forEach((params) => star(ctx, params));
      }
    }
  }, [stars]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === "Escape" && displayForm) {
        dispatch(toggleDisplay(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return (): void => document.removeEventListener("keydown", handleKeyDown);
  }, [displayForm, dispatch]);
  const handleClickForm = (e: React.MouseEvent): void => {
    const target = e.currentTarget;
    const save = target.textContent as string;
    dispatch(sagaLoadGame(save));
    setTimeout(() => {
      navigate("/game");
    }, 50);
  };
  useEffect(() => {
    dispatch(sagaGetSaves());
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
