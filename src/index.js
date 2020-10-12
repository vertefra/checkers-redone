import Board from "./class.js";
import "./style.css";

console.log("sanity");
const board = new Board(8, 8);

board.initBoard();
board.setPiece("W", [2, 4]);
// board.setPiece("W", [4, 2]);
board.setPiece("B", [2, 2]);
board.setPiece("W", [1, 1]);
board.setPiece("W", [2, 4]);
board.setPiece("B", [3, 3]);
board.setPiece("B", [3, 5]);
// board.setPiece("B", [5, 3]);

const moves = board.evaluateMoves([1, 1]);
console.log("MOVES: ", moves);

board.renderBoard();
