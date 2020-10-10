import Board from "./class.js";
import "./style.css";

console.log("sanity");
const board = new Board(8, 8);

board.initBoard();
board.setPiece("W", [3, 3]);
console.log(board.allowedMoves([3, 3]));
board.renderBoard();
