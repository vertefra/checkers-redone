import Board from "./class";

export default class BoardEngine {
  constructor(board, DOMAnchor) {
    this.root = DOMAnchor;
    this.board = board;
    this.playerColor = "W";
    this.opponentColor = "B";
    this.turn = "W";
    this.phases = ["select", "move", "opponent-turn"];
    this.phase = "select";
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

        // Check if the clicked cell has target class means that the pase \
        // switch to "move"

        const clickedCell = document.getElementById(e.target.id);
        clickedCell.classList.contains("target")
          ? (this.phase = "move")
          : (this.phase = "select");

        if (this.phase === "select") {
          this.handleSelectClick(cellStatusObject);
        }
        if (this.phase === "move") {
          console.log("le't move!!");
        }
      });

      grapBoard.append(grapCell);
    }

    this.root.append(grapBoard);
  }

  handleSelectClick(cellStatus) {
    console.log(cellStatus);
    const b = this.board;

    if (this.turn === this.playerColor) {
      if (cellStatus.status === this.playerColor) {
        //Highlight possible positions

        const cellCoord = Board.getCoord(cellStatus.cellId);

        const positionCell = document.getElementById(cellStatus.cellId);
        this.cleanHighligths();
        positionCell.classList.add("highlight");

        const moves = b.evaluateMoves(cellCoord);

        for (let move of moves) {
          const target = move[1];

          // find the cell with id equal to the coordinates from position
          // and highlight it

          if (Array.isArray(target)) {
            const targetId = Board.getKey(target);
            const targetCell = document.getElementById(targetId);
            targetCell.classList.add("target");
          }
        }
      } else if (cellStatus.status === this.opponentColor) {
        console.log("this is your opponent");
      } else {
        console.log("void or empty");
      }
    } else {
      console.log("not your turn");
    }
  }

  highLigthPossiblePositions() {}

  cleanHighligths() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("highlight", "target");
    });
  }
}
