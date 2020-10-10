import Board from "./class.js";
import "./style.css";

console.log("sanity");
const board = new Board(8, 8);

board.initBoard();
board.setPiece("W", [4, 4]);
board.setPiece("B", [3, 5]);
console.log(board.allowedMoves([4, 4]));
const res = board.canJump([4, 4], [3, 5]);
console.log(res);
board.renderBoard();
