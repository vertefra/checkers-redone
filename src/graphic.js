export default class BoardEngine {
  constructor(board, DOMAnchor) {
    this.root = DOMAnchor;
    this.board = board;
    this.playerColor = "W";
    this.opponentColor = "B";
    this.turn = "W";
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
      const cellStatus = b.board[cell];
      const grapCell = document.createElement("div");
      grapCell.classList.add("cell");

      if (cellStatus === " ") grapCell.classList.add("void-cell");
      if (cellStatus === "B") grapCell.classList.add("B-cell");
      if (cellStatus === "W") grapCell.classList.add("W-cell");

      grapCell.id = cell;

      if (cellStatus === "B" || cellStatus === "W") {
        grapCell.innerHTML = `
          <img class="pawn"
            src="./assets/${cellStatus}.svg"
            stroke="red"
          />
        `;
      }

      grapCell.addEventListener("click", (e) => {
        const cellStatusObject = {
          cellId: e.target.id,
          status: cellStatus,
        };

        this.handleSelectClick(cellStatusObject);
      });

      grapBoard.append(grapCell);
    }

    this.root.append(grapBoard);
  }

  handleSelectClick(cellStatus) {
    console.log(cellStatus);
    if (this.turn === this.playerColor) {
      console.log("ok thats your turn");
      if (cellStatus.status === this.playerColor) {
        console.log("ok this is your piece");
      } else if (cellStatus.status === this.opponentColor) {
        console.log("this is your opponent");
      } else {
        console.log("void or empty");
      }
    } else {
      console.log("not your turn");
    }
  }
}
