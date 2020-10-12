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
board.setPiece("W", [4, 4]);
board.setPiece("B", [3, 3]);
// board.setPiece("B", [5, 3]);

board.renderBoard();

const moves = board.evaluateMoves([3, 3]);
board.execMove([
  [2, 2],
  [1, 3],
]);

const jump = {
  jump: [4, 2],
  opponent: [3, 3],
};

const success = board.execMove([[2, 4], jump]);
console.log(success);

board.renderBoard();
