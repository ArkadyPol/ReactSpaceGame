import { LOADSAVES, TOGGLEDISPLAY } from "./types";
import { getSaves } from "../logic";

export function loadSaves() {
  return function(dispatch) {
    (async () => {
      const saves = await getSaves();
      dispatch({ type: LOADSAVES, saves });
    })();
  };
}
export function toggleDisplay(display) {
  return {
    type: TOGGLEDISPLAY,
    display
  };
}
