const { jumpCell } = require("./utils.js");

// coordinates are an array of two elements [x,y]

class Board {
  constructor(x, y = x) {
    this.x = x;
    this.y = y;
    this.board = {};
  }
  //
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
    const move_3 = [];
    const move_4 = [];

    switch (cell) {
      case " ":
        throw "selected cell is void";

      case 0:
        throw "selected cell is empty";

      case "W":
        // B pieces move from top to bottom

        move_1.push(x - 1, y - 1);
        move_2.push(x + 1, y - 1);

        if (this.inBoard(move_1)) allMoves.push(move_1);
        if (this.inBoard(move_2)) allMoves.push(move_2);
        return allMoves;

      case "B":
        // white pieces move from bottom to top

        move_1.push(x - 1, y + 1);
        move_2.push(x + 1, y + 1);

        if (this.inBoard(move_1)) allMoves.push(move_1);
        if (this.inBoard(move_2)) allMoves.push(move_2);
        return allMoves;

      // TODO: create cases for KW and KB

      case "WK":
      case "BK":
        move_1.push(x - 1, y - 1);
        move_2.push(x + 1, y - 1);
        move_3.push(x - 1, y + 1);
        move_4.push(x + 1, y + 1);

        if (this.inBoard(move_1)) allMoves.push(move_1);
        if (this.inBoard(move_2)) allMoves.push(move_2);
        if (this.inBoard(move_3)) allMoves.push(move_3);
        if (this.inBoard(move_4)) allMoves.push(move_4);

        return allMoves;
    }
  }

  //
  // canJump return the jumpCoordinates if a jump is possible, false if not
  //

  canJump(playerCoord, opponentCoord) {
    const Pcolor = this.board[Board.getKey(playerCoord)];
    const Ocolor = this.board[Board.getKey(opponentCoord)];

    if (Pcolor === Ocolor) return false;

    if (
      (Pcolor !== "W" && Pcolor !== "B") ||
      (Ocolor !== "W" && Ocolor !== "B")
    ) {
      throw "Player/Opponent position is invalid";
    } else {
      const jump = jumpCell(playerCoord, opponentCoord);
      const jumpKey = Board.getKey(jump);

      console.log(this.board[jumpKey]);

      if (this.inBoard(jump) && this.board[jumpKey] === 0) {
        // jump is possible. Return and object with the opponent position
        // and the jump coordinates

        const jumpObj = {
          jump,
          opponent: opponentCoord,
        };

        return jumpObj;
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
