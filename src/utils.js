const jumpCell = (playerCoord, opponentCoord) => {
  // returns the coordinates of the cell immediatly after
  // another cell in diagonal

  // _ _ _ _ _ _
  // a _ _ _ b _
  // _ O _ O _ _
  // _ _ P _ _ _
  // _ O _ O _ _
  // d _ _ _ c _
  // _ _ _ _ _ _

  // the cases could be four, a,b,c,d given a
  // piege W and 4 pieces in 4 different positions

  // output values must be verified if they are inside
  // the board or if they are occupied or if they
  // are an allowed move for that piece

  const [Px, Py] = playerCoord;
  const [Ox, Oy] = opponentCoord;

  // case a

  // Ox = Px-1
  // Oy = Py-1
  // ax = Px-2 Py-2

  if (Ox === Px - 1 && Oy === Py - 1) {
    return [Px - 2, Py - 2];
  }

  // case b

  // Ox = Px+1
  // Oy = Py-1
  // b = Px+2 Py-2

  if (Ox === Px + 1 && Oy === Py - 1) {
    return [Px + 2, Py - 2];
  }

  // case c

  // Ox = Px+1
  // Oy = Py+1
  // c = Px+2 Py+2

  if (Ox === Px + 1 && Oy === Py + 1) {
    return [Px + 2, Py + 2];
  }

  // case d

  // Ox = Px-1
  // Oy = Py+1
  // d = Px+2 Py+2

  if (Ox === Px - 1 && Oy === Py + 1) {
    return [Px - 2, Py + 2];
  }

  throw "Error occurred, cells could be not adiacent";
};

// compare two array of coordinates and returns true if equal, false if not
const eq = (coord1, coord2) => {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
};

module.exports = { jumpCell, eq };
