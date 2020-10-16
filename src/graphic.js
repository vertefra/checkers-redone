export default class BoardEngine {
  constructor(board, DOMAnchor) {
    this.root = DOMAnchor;
    this.board = board;
  }

  initBoard() {
    this.board.setUpBoard();
  }

  renderBoard() {
    const grapBoard = document.createElement("div");
    const b = this.board;

    grapBoard.classList.add("board");
    grapBoard.style.gridTemplateColumns = `repeat(${b.x}, ${b.x}fr)`;
    grapBoard.style.gridTemplateRows = `repeat(${b.y}, ${b.y}fr)`;

    for (let cell in b.board) {
      const cellType = b.board[cell];
      const grapCell = document.createElement("div");
      grapCell.classList.add("cell");

      if (cellType === " ") grapCell.classList.add("void-cell");
      if (cellType === "B") grapCell.classList.add("B-cell");
      if (cellType === "W") grapCell.classList.add("W-cell");

      if (cellType === "B" || cellType === "W") {
        grapCell.innerHTML = `
          <img class="pawn"
            src="./assets/${cellType}.svg"
            stroke="red"
          />
        `;
      }

      grapBoard.append(grapCell);
    }

    this.root.append(grapBoard);
  }
}
