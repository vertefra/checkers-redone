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
    const allMoves = [];
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

        if (this.inBoard(move_1)) allMoves.push(move_1);
        if (this.inBoard(move_2)) allMoves.push(move_2);
        return allMoves;

      case "B":
        // black pieces move from top to bottom

        move_1.push(x - 1, y + 1);
        move_2.push(x + 1, y + 1);

        if (this.inBoard(move_1)) allMoves.push(move_1);
        if (this.inBoard(move_2)) allMoves.push(move_2);
        return allMoves;

      // TODO: create cases for KW and KB
    }
  }

  canJump(coord) {
    // can jump true if one of the allowed moves is occupy by opponent and the sequential cell is empy
    const player = this.returnPiece(coord);
    let opponent = "";
    if (player !== " " && player !== 0) {
      opponent = player === "W" ? "B" : "W";
    } else {
      throw "current cell is not W or B cannot evaluate a jump";
    }
    const allowedMoves = this.allowedMoves(coord);

    // check for every allowed move if there is an opponent in that position

    for (let aroundCoord of allowedMoves) {
      const piece = this.returnPiece(aroundCoord);
      if (piece === opponent) {
      }
    }
  }

  inBoard(coord) {
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

module.exports = Board;

// const board = new Board(8);
// board.initBoard();
// board.renderBoard();
// board.setPiece("W", [5, 5]);
// board.setPiece("B", [4, 4]);
// console.log(board.canJump([5, 5]));
// board.renderBoard();
