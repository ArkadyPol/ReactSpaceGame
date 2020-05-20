import { SaveType, GameType } from "./types";

const api = {
  async getSaves(): Promise<string[]> {
    const response = await fetch("/saves");
    const saves: string[] = await response.json();
    return saves;
  },
  saveGame(save: SaveType): void {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(save),
    };
    fetch("/saves", options);
  },
  async loadGame(saveName: string): Promise<GameType> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name: saveName }),
    };
    const response = await fetch("/save", options);
    const game: GameType = await response.json();
    return game;
  },
};

export default api;
