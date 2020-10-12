import Engine from "./engine.js";
import Board from "./class.js";
import "./style.css";

console.log("sanity");

const board = new Board(8);
const board_engine = new Engine(board);
board_engine.setStartingBoard();
board_engine.renderBoard();

const score = board_engine.evaluateBoard("W", board_engine.board);

board_engine.bestMove("W");
board_engine.renderBoard();
