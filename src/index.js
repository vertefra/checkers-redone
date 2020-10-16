import Board from "./class.js";
import "./style.css";
import { bestMove } from "./utils.js";

console.log("sanity");

const board = new Board(8);
board.setUpBoard();
board.renderBoard();

console.log(board.returnBestMove("B"));

board.renderBoard();
