const Board = require("./class.js");

export default class Engine {
  constructor(board) {
    board.initBoard();
    this.b = board;
    this.board = board.board;
    this.possibleMoves = [];
  }
  renderBoard() {
    this.b.renderBoard();
  }

  setStartingBoard() {
    console.log("setting starting board");
    this.b.setUpBoard();
  }

  evalAllPossibleMoves(color) {
    for (let key of Object.keys(this.board)) {
      const coord = Board.getCoord(key);
      const cell = this.b.returnPiece(coord);
      if (cell === color) {
        const moves = this.b.evaluateMoves(coord);
        if (moves.length > 0) this.possibleMoves.push(moves);
      }
    }

    return this.possibleMoves;
  }
}
