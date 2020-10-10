const Board = require("./src/class");

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
    expect(board.allowedMoves([3, 3])[0]).toContain(2);
  });
});
