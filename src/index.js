import Board from "./class.js";
import BoardEngine from "./graphic";

import "./board.css";

const board = new Board(8);
const root = document.getElementById("root");
const engine = new BoardEngine(board, root);

engine.initBoard();
console.log(engine.renderBoard());
