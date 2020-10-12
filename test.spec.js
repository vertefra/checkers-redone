const Board = require("./src/class");
const { jumpCell, eq } = require("./src/utils");

describe("testing main functionality of Board class", () => {
  let board;
  beforeAll(() => {
    board = new Board(8);
    board.initBoard();
  });

  test("board  is istanceof Board", () => {
    expect(board instanceof Board).toBe(true);
  });

  beforeEach(() => {
    board.setPiece("W", [2, 4]);
    board.setPiece("W", [4, 2]);
    board.setPiece("B", [2, 2]);
    board.setPiece("W", [1, 1]);
    board.setPiece("B", [5, 3]);
    board.setPiece("B", [3, 5]);
  });

  test("expect a W piece in pos 2-4", () => {
    expect(board.board["2-4"]).toBe("W");
  });

  test("expect a W piece in pos 4-2", () => {
    expect(board.board["4-2"]).toBe("W");
  });

  test("expec a B piece in pos 2-2", () => {
    expect(board.board["2-2"]).toBe("B");
  });

  test("expec a W piece in pos 1-1", () => {
    expect(board.board["1-1"]).toBe("W");
  });

  test("expect a B piece in pos 5-3 and a B piece in pos 3-5", () => {
    expect(board.board["5-3"]).toBe("B");
    expect(board.board["3-5"]).toBe("B");
  });

  // TESTING ALLOWED MOVES

  test("expect allowed moves for W in 2-4 to be[[1,3],[3,3]]", () => {
    const expected = [
      [1, 3],
      [3, 3],
    ];
    expect(board.allowedMoves([2, 4])).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("expect allowed moves for B in 2-2 to be [[3,3],[3,1]]", () => {
    const expected = [
      [1, 3],
      [3, 3],
    ];
    expect(board.allowedMoves([2, 2])).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("expect allowed moves for W piece in 1-1 to be []", () => {
    const expected = [];
    expect(board.allowedMoves([1, 1])).toEqual(expect.arrayContaining([]));
  });
});

describe("Testing jumps and advance features of Board class", () => {
  const board = new Board(8);
  beforeAll(() => {
    board.initBoard();
    board.setPiece("W", [4, 4]);
    board.setPiece("B", [3, 3]);
    board.setPiece("B", [5, 3]);
    board.setPiece("B", [5, 5]);
    board.setPiece("B", [3, 5]);
  });

  test("expecting a W piece in position 4-4 and B in position 3-3", () => {
    expect(board.board["4-4"]).toBe("W");
    expect(board.board["3-3"]).toBe("B");
  });

  test("W piece in position 4-4 returns [2,2] for jumping coordinates for a B piece in position 3-3", () => {
    const expected = { jump: [2, 2], opponent: [3, 3] };
    expect(board.canJump([4, 4], [3, 3])).toEqual(
      expect.objectContaining(expected)
    );
  });

  test("W piece in position 4-4 returns [6,2] for jumping coordinates for a B piece in position 5-3", () => {
    const expected = { jump: [6, 2], opponent: [5, 3] };
    expect(board.canJump([4, 4], [5, 3])).toEqual(
      expect.objectContaining(expected)
    );
  });

  test("W piece in position 4-4 returns false for jumping coordinates for a B piece in position 5-5 (direction not allowed)", () => {
    expect(board.canJump([4, 4], [5, 5])).toBe(false);
  });

  test("W piece in position 4-4 returns false for jumping coordinates for a B piece in positon 3-5 (direction not allowed)", () => {
    expect(board.canJump([4, 4], [3, 5])).toBe(false);
  });

  test("B piece in position 3-3 return false for jumping coordinate for W pice in position 4-4 (jump cell occupied)", () => {
    expect(board.canJump([3, 3], [4, 4])).toBe(false);
  });
});

// ============================================================
// Testing correct evaluation of all moves around a given piece
// ============================================================

describe("Testing evaluation of all moves around a piece", () => {
  const board = new Board(8);

  beforeEach(() => {
    board.initBoard();
    board.setPiece("W", [2, 4]);
    board.setPiece("B", [3, 3]);
    board.setPiece("W", [1, 1]);
  });

  test("Moves for piece W in pos 2-4 are [[1,3],{opponent:[3,3],jump:[4,2]}]", () => {
    const position = [2, 4];
    const expected = [1, 3];
    const objeExpected = {
      opponent: [3, 3],
      jump: [4, 2],
    };
    expect(board.evaluateMoves([2, 4])).toEqual(
      expect.objectContaining([
        [position, expected],
        [position, objeExpected],
      ])
    );
  });

  test("Moves for piece B in position 3-3 are[[4, 4],{opponents:[2,4], jump[1,5]}]", () => {
    const position = [3, 3];
    const expected = [4, 4];
    const objeExpected = {
      opponent: [2, 4],
      jump: [1, 5],
    };
    expect(board.evaluateMoves([3, 3])).toEqual(
      expect.arrayContaining([
        [position, expected],
        [position, objeExpected],
      ])
    );
  });

  test("Moves for piece W in position 1-1 are []", () => {
    const expected = [];
    expect(board.evaluateMoves([1, 1])).toEqual(
      expect.arrayContaining(expected)
    );
  });
});

// =========================================================== //
// TESTING a move execution
// =========================================================== //

describe("testing moves execution ", () => {
  const board = new Board(8);
  board.initBoard();

  beforeEach(() => {
    board.setPiece("W", [1, 1]);
    board.setPiece("B", [2, 2]);
    board.setPiece("B", [3, 3]);
    board.setPiece("W", [2, 4]);
    board.setPiece("W", [4, 4]);
  });

  test("B piece 2-2 move to 1-3", () => {
    const move = [
      [2, 2],
      [1, 3],
    ];
    board.execMove(move);
    expect(board.board["1-3"]).toBe("B");
    expect(board.board["2-2"]).toBe(0);
  });

  test("test invalid move for W 1-1", () => {
    const move = [
      [1, 1],
      [2, 2],
    ];

    const expected = {
      success: false,
      error: "destination cell is not empty",
    };

    expect(board.execMove(move)).toEqual(expect.objectContaining(expected));
  });

  // testing a jump
  test("testing a jump from W in 2-4 to 4-2 jumping piece in 3-3", () => {
    const move = [
      [2, 4],
      {
        jump: [4, 2],
        opponent: [3, 3],
      },
    ];
    board.execMove(move);
    expect(board.board["2-4"]).toBe(0);
    expect(board.board["3-3"]).toBe(0);
    expect(board.board["4-2"]).toBe("W");
  });
});

// =========================================================== //
//
//    TEST FOR UTILS FUNCTIONALITIES
//
// =========================================================== //

describe("Testing utils functionalities", () => {
  test("expect jump cell for W in 4-4 and B in 3-3 to be [2,2]", () => {
    const expected = [2, 2];
    expect(jumpCell([4, 4], [3, 3])).toEqual(expect.arrayContaining(expected));
  });

  test("expect jump cell for W in 4-4 and B in 5-3 to be [6,2]", () => {
    const expected = [6, 2];
    expect(jumpCell([4, 4], [5, 3])).toEqual(expect.arrayContaining(expected));
  });

  test("expect jump cell for W in 4-4 and B in 5-5 to be [6,6]", () => {
    const expected = [6, 6];
    expect(jumpCell([4, 4], [5, 5])).toEqual(expect.arrayContaining(expected));
  });

  test("expect jump cell for W in 4-4 and B in 3-5 to be [2,6]", () => {
    const expected = [2, 6];
    expect(jumpCell([4, 4], [3, 5])).toEqual(expect.arrayContaining(expected));
  });

  test("expect eq([3,3],[4,3]) to return false", () => {
    expect(eq([3, 3], [4, 3])).toBe(false);
  });

  test("expect eq([3,3],[3,3]) to return true", () => {
    expect(eq([3, 3], [3, 3])).toBe(true);
  });

  test("expect eq([4,3],[3,3]) to return false", () => {
    expect(eq([4, 3], [3, 3])).toBe(false);
  });
});
