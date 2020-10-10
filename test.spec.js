const Board = require("./src/class");
const { jumpCell } = require("./src/utils");

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
    board.setPiece("W", [3, 3]);
    board.setPiece("B", [2, 2]);
    board.setPiece("W", [1, 1]);
  });

  afterEach(() => {
    board.removePiece([3, 3]);
  });

  test("expect a W piece in pos 3-3", () => {
    expect(board.board["3-3"]).toBe("W");
  });

  test("expec a B piece in pos 2-2", () => {
    expect(board.board["2-2"]).toBe("B");
  });

  test("expec a W piece in pos 1-1", () => {
    expect(board.board["1-1"]).toBe("W");
  });

  // TESTING ALLOWED MOVES

  test("expect allowed moves for W in 3-3 to be[[4,2],[2,2]]", () => {
    const expected = [
      [4, 2],
      [2, 2],
    ];
    expect(board.allowedMoves([3, 3])).toEqual(
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

  test("W piece in position 4-4 returns [1,2] for jumping coordinates for a B piece in position 3-3", () => {
    const expected = { jump: [2, 2], opponent: [3, 3] };
    expect(board.canJump([4, 4], [3, 3])).toEqual(
      expect.objectContaining(expected)
    );
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
});
