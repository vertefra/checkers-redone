// coordinates are an array of two elements [x,y]

class Board {
  constructor(x, y = x) {
    this.x = x;
    this.y = y;
    this.board = {};
  }

  // initialize the board with 0 value
  initBoard() {
    console.log("sanity");
    for (let x = 1; x <= this.x; x++) {
      for (let y = 1; y <= this.y; y++) {
        const coord = `${x}-${y}`;
        if ((x + y) % 2 === 0) {
          this.board[coord] = 0;
        } else {
          this.board[coord] = " ";
        }
      }
    }
  }

  renderBoard() {
    let board = "";
    let lineCount = 0;
    let line = 1;
    let firstLine = true;

    Object.values(this.board).forEach((value) => {
      lineCount++;

      if (lineCount % this.x === 0) {
        board += value;
        board += " \n";
      } else {
        board += value;
      }
    });
    console.log(board);
  }

  setPiece(color, coord) {
    if (color === "W" || color === "B") {
      const key = Board.getKey(coord);
      if (this.board[key] !== " ") {
        this.board[key] = color;
      } else {
        throw "cannot place a piece here";
      }
    } else {
      throw "color must be W or B";
    }
  }

  removePiece(coord) {
    const key = Board.getKey(coord);
    if (this.board[key] === " ") {
      throw "void cell, nothing to remove";
    } else {
      this.board[key] = 0;
    }
  }

  static getKey(coord) {
    return `${coord[0]}-${coord[1]}`;
  }

  static getCoord(key) {
    return key.split("-");
  }

  movePiece(coordFrom, coordTo) {}
}

const board = new Board(8);
board.initBoard();
board.renderBoard();
board.setPiece("W", [5, 5]);
board.setPiece("B", [1, 1]);
board.setPiece("B", [8, 8]);
board.removePiece([1, 1]);
board.renderBoard();
