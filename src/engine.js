const Board = require("./class.js");
const BinaryTree = require("./binarySearch.js");
const { bestMove } = require("./utils");

export default class Engine {
  constructor(board) {
    board.initBoard();
    this.b = board;
    this.board = board.board;
    this.possibleMoves = [];
    this.tree = new BinaryTree();
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

  evaluateBoard(color, board = this.board) {
    const MAX = color;
    const MIN = MAX === "W" ? "B" : "W";
    let MAX_POINTS = 0,
      MIN_POINTS = 0;
    for (let key of Object.keys(board)) {
      const coord = Board.getCoord(key);
      const cell = this.b.returnPiece(coord);
      if (cell === MAX) {
        MAX_POINTS++;
      } else if (cell === MIN) {
        MIN_POINTS++;
      } else if (cell === "K" + MAX) {
        MAX_POINTS += 10;
      } else if (cell === "K" + MIN) {
        MIN_POINTS += 10;
      }
    }
    return MAX_POINTS - MIN_POINTS;
  }

  move(move) {
    if (this.b.execMove(move)) {
      return this.board;
    } else {
      return false;
    }
  }

  bestMove(max, board = this.board) {
    const saved_board = { ...board };
    const MAX = max;
    const MIN = MAX === "W" ? "B" : "W";
    const max_moves = this.evalAllPossibleMoves(MAX);
    console.log(max_moves);
    for (let move of max_moves) {
      this.move(move);
      const max_points = this.evaluateBoard(MAX);
      this.tree.insertBoard(this.board, max_points);
      console.log(this.tree);
    }
  }

  loadBoard(board) {
    this.board = { ...board };
    return this.board;
  }
}
