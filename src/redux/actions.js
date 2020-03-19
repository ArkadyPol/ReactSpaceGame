import { LOADSAVES, TOGGLEDISPLAY } from "./types";

export function loadSaves() {
  return {
    type: LOADSAVES
  };
}
export function toggleDisplay(display) {
  return {
    type: TOGGLEDISPLAY,
    display
  };
}
