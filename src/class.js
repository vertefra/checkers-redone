const { jumpCell, eq } = require("./utils.js");

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
    let column = 0;
    const emptyStyleBack = "background: #000";
    for (let y = 1; y <= this.y; y++) {
      for (let x = 1; x <= this.x; x++) {
        column++;
        const key = `${x}-${y}`;
        const cell = this.board[key];
        board += cell;
        if (column % this.x === 0) board += "\n";
      }
    }
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

  // returns all the allowed moves for a piece (W piece North-East North-West)
  // B pieces South-East South-West. Doestn check if the cell is occupied.
  // check if the cell is out of the board and does not returns it
  // return an array with coordinates (1-2 for B and W, max 4 for K)

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
    const allowedMoves = this.allowedMoves(playerCoord);

    let directionAllowed = false;
    for (let move of allowedMoves) {
      if (eq(move, opponentCoord)) directionAllowed = true;
    }

    if (Pcolor === Ocolor) return false;
    if (!directionAllowed) return false;

    if (
      (Pcolor !== "W" && Pcolor !== "B") ||
      (Ocolor !== "W" && Ocolor !== "B")
    ) {
      throw "Player/Opponent position is invalid";
    } else {
      const jump = jumpCell(playerCoord, opponentCoord);
      const jumpKey = Board.getKey(jump);

      if (this.inBoard(jump) && this.board[jumpKey] === 0) {
        // jump is possible. Return and object with the opponent position
        // and the jump coordinates

        const jumpObj = {
          jump,
          opponent: opponentCoord,
        };

        return jumpObj;
      } else {
        return false;
      }
    }
  }

  // this should be the core of our methods. will return every single possible move
  // for a piece

  evaluateMoves(coord) {
    const Pcolor = this.board[Board.getKey(coord)];
    const Ocolor = Pcolor === "W" ? "B" : "W";
    const allowedMoves = this.allowedMoves(coord);
    const possibleMoves = [];
    for (let move_to of allowedMoves) {
      const move = [coord];
      const cellStatus = this.returnPiece(move_to);
      if (cellStatus === 0) {
        move.push(move_to);
        possibleMoves.push(move);
      } else if (cellStatus === Ocolor) {
        const jump = this.canJump(coord, move_to);
        move.push(jump);
        if (jump) possibleMoves.push(move);
      }
    }

    return possibleMoves;
  }

  // EXEC MOVE:
  // a move is an array with first element coord of position
  // and second element is eithe a move or a jump object

  execMove(move) {
    const [from, to] = move;
    const player = this.board[Board.getKey(from)];
    let allowed = false;

    // if player is 0 or ' ' return false

    if (player === 0 || player === " ")
      return { success: false, error: "player cell is 0 or void" };

    // after this check, let's see if the move is a jump
    // or a normal move

    if (Array.isArray(to)) {
      // if destination cell is not empty return false

      const to_cell = this.board[Board.getKey(to)];
      if (to_cell !== 0)
        return { success: false, error: "destination cell is not empty" };

      // check if the move is in the allowed moves

      for (let move of this.allowedMoves(from)) {
        if (eq(move, to)) allowed = true;
      }

      // exit if the check oif allowed moves was not positive

      if (!allowed)
        return { success: false, error: "move not allowed for this piece" };

      // execute the move

      this.removePiece(from);
      this.setPiece(player, to);
    } else {
      // ==================
      //  executing a jump
      // ==================

      const { jump, opponent } = to;

      console.log(this.board[Board.getKey(jump)]);

      if (opponent === 0 || opponent === " ")
        return { success: false, error: "opponent position is 0 or void" };

      if (this.board[Board.getKey(jump)] !== 0)
        return { success: false, error: "jump position not empty" };

      this.removePiece(from);
      this.setPiece(player, jump);
      this.removePiece(opponent);
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
