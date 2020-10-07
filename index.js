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

  returnPiece(coord) {
    return this.board[Board.getKey(coord)];
  }

  removePiece(coord) {
    const key = Board.getKey(coord);
    if (this.board[key] === " ") {
      throw "void cell, nothing to remove";
    } else {
      this.board[key] = 0;
    }
  }

  allowedMoves(coord) {
    const key = Board.getKey(coord);
    const cell = this.board[key];
    const allowedMoves = [];
    const x = coord[0];
    const y = coord[1];
    const move_1 = [];
    const move_2 = [];

    switch (cell) {
      case " ":
        throw "selected cell is void";

      case 0:
        throw "selected cell is empty";

      case "W":
        // black pieces move from top to bottom

        move_1.push(x - 1, y - 1);
        move_2.push(x + 1, y - 1);

        // the two allowed moves are [x-1, y+1] and [x+1, y+1]

        if (this.inBoard(move_1)) allowedMoves.push(move_1);
        if (this.inBoard(move_2)) allowedMoves.push(move_2);
        return allowedMoves;

      case "B":
        // black pieces move from top to bottom

        move_1.push(x - 1, y + 1);
        move_2.push(x + 1, y + 1);

        // the two allowed moves are [x-1, y+1] and [x+1, y+1]

        if (this.inBoard(move_1)) allowedMoves.push(move_1);
        if (this.inBoard(move_2)) allowedMoves.push(move_2);
        return allowedMoves;
    }
  }

  inBoard(coord) {
    console.log(this.x, coord[0]);
    if (coord[0] > this.x || coord[1] > this.y) {
      return false;
    } else {
      return true;
    }
  }

  static getKey(coord) {
    return `${coord[0]}-${coord[1]}`;
  }

  static getCoord(key) {
    return key.split("-");
  }
}

const board = new Board((x = 8));
board.initBoard();
board.renderBoard();
board.setPiece("W", [5, 5]);
board.setPiece("B", [1, 1]);
board.setPiece("B", [4, 4]);
board.removePiece([1, 1]);
console.log(board.allowedMoves([5, 5]));
board.renderBoard();
