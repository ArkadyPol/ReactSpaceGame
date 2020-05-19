const api = {
  async getSaves() {
    const response = await fetch("/saves");
    const saves = await response.json();
    return saves;
  },
  saveGame(save) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(save),
    };
    fetch("/saves", options);
  },
  async loadGame(saveName) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name: saveName }),
    };
    const response = await fetch("/save", options);
    const game = await response.json();
    return game;
  },
};
export default api;
