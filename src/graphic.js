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
    const grapBoard = document.createElement("div");
    const b = this.board;
    grapBoard.classList.add("board");
    grapBoard.style.gridTemplateColumns = `repeat(${b.x}, ${b.x}fr)`;
    grapBoard.style.gridTemplateRows = `repeat(${b.y}, ${b.y}fr)`;
    this.root.append(grapBoard);
  }

  renderBoard() {
    console.log("Rendeing");
    const grapBoard = document.querySelector(".board");
    grapBoard.innerHTML = "";
    const b = this.board;

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

      if (this.phase === "opponent-turn") {
        this.computerMove();
      }

      grapCell.addEventListener("click", (e) => {
        const cellStatusObject = {
          cellId: e.target.id,
          status: cellStatus,
        };

        // Check if the clicked cell has target class means that the pase \
        // switch to "move"

        const clickedCell = document.getElementById(e.target.id);
        clickedCell.classList.contains("target") ||
        clickedCell.classList.contains("jump")
          ? (this.phase = "move")
          : (this.phase = "select");

        if (this.phase === "select") {
          this.handleSelectClick(cellStatusObject);
        }
        if (this.phase === "move") {
          this.handleMoveClick(cellStatusObject);
        }
      });

      grapBoard.append(grapCell);
    }
  }

  computerMove() {
    const b = this.board;
    const bestMove = b.returnBestMove(this.opponentColor);
    b.execMove(bestMove);
    this.phase = "select";
    this.turn = this.playerColor;
    b.renderBoard();
  }

  handleMoveClick(cellStatus) {
    const b = this.board;

    const startingCell = document.querySelector(".highlight");
    const startingCoord = Board.getCoord(startingCell.id);
    const clickedCell = document.getElementById(cellStatus.cellId);

    // if he clicked on a cell that has class jump prepare a jump
    // if he clicked on a cell that has class target prepare a move

    if (clickedCell.classList.contains("jump")) {
      console.log("this is a jump");

      const jumpCoord = Board.getCoord(cellStatus.cellId);
      const opponentCell = document.querySelector(".target");
      const opponentCoord = Board.getCoord(opponentCell.id);

      const jumpObj = {
        jump: jumpCoord,
        opponent: opponentCoord,
      };

      console.log(jumpObj);

      if (cellStatus.status === 0) {
        b.execMove([startingCoord, jumpObj]);
      }
    } else if (clickedCell.classList.contains("target")) {
      console.log("normal move");
      const targetCoord = Board.getCoord(cellStatus.cellId);
      if (cellStatus.status === 0) {
        b.execMove([startingCoord, targetCoord]);
      }
    }

    this.phase = "opponent-turn";
    this.turn = this.opponentColor;

    this.cleanHighligths();
    this.renderBoard();
  }

  handleSelectClick(cellStatus) {
    console.log(cellStatus);
    const b = this.board;

    if (this.turn === this.playerColor && this.phase === "select") {
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
          } else {
            const opponentId = Board.getKey(target.opponent);
            const jumpId = Board.getKey(target.jump);
            const opponentCell = document.getElementById(opponentId);
            const jumpCell = document.getElementById(jumpId);
            opponentCell.classList.add("target");
            jumpCell.classList.add("jump");
          }
        }
      } else if (cellStatus.status === this.opponentColor) {
        console.log("this is your opponent");
      } else {
        console.log("void or empty");
      }
    } else {
      console.log("not your turn not right phase");
    }
  }

  cleanHighligths() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("highlight", "target");
    });
  }
}
