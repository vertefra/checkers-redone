const Board = require("./engine.js");

export default class Engine {
  constructor(board) {
    board.initBoard();
    this.b = board;
    this.board = board.board;
  }
  renderBoard() {
    this.b.renderBoard();
  }
}
