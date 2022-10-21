import { pieceImage, PIECE_INDICES, SPRITE_SIZE } from "./imageloader";
import pieceData from "./pieces";

class Piece {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.moves = 0;
  }

  render = (ctx, x = this.x * this.size, y = this.y * this.size) => {
    ctx.drawImage(
      pieceImage,
      (PIECE_INDICES[this.type] % 6) * SPRITE_SIZE,
      Math.floor(PIECE_INDICES[this.type] / 6) * SPRITE_SIZE,
      SPRITE_SIZE,
      SPRITE_SIZE,
      x,
      y,
      this.size,
      this.size
    );
  };

  /**
   * Move the piece to a new position.
   *
   * @param {number} x the x coordinate of the piece
   * @param {number} y the y coordinate of the piece
   *
   */
  move = (x, y, pieces) => {
    if (this.isValidMove(x, y, pieces)) {
      this.x = x;
      this.y = y;
      this.moves++;
      return true;
    }
    return false;
  };

  /**
   * Checks if a move is valid.
   *
   * @param {number} x the x coordinate of the piece
   * @param {number} y the y coordinate of the piece
   *
   * @returns {boolean} whether the move is valid
   */
  isValidMove = (x, y, pieces) => {
    // pawn moves
    if (this.type === "P" || this.type === "p") {
      // TODO: fix for capturing
      if (this.x !== x) return false;

      let diffY = y - this.y;
      if (this.type === "P") {
        if (this.moves === 0) {
          if (diffY !== -1 && diffY !== -2) return false;
        } else {
          if (diffY !== -1) return false;
        }
      } else {
        if (this.moves === 0) {
          if (diffY !== 1 && diffY !== 2) return false;
        } else {
          if (diffY !== 1) return false;
        }
      }
    }

    // knight moves
    if (this.type === "N" || this.type === "n") {
      let diffX = Math.abs(x - this.x);
      let diffY = Math.abs(y - this.y);
      if (diffX === 1 && diffY === 2) return true;
      if (diffX === 2 && diffY === 1) return true;
      return false;
    }

    // bishop moves
    if (this.type === "B" || this.type === "b") {
      let diffX = Math.abs(x - this.x);
      let diffY = Math.abs(y - this.y);
      if (diffX !== diffY) return false;
      let dirX = x - this.x > 0 ? 1 : -1;
      let dirY = y - this.y > 0 ? 1 : -1;
      for (const piece of pieces) {
        for (let i = 1; i < diffX; i++) {
          if (piece.x === this.x + i * dirX && piece.y === this.y + i * dirY)
            return false;
        }
      }
    }

    // rook moves
    if (this.type === "R" || this.type === "r") {
      if (x !== this.x && y !== this.y) return false;
      let dirX = x - this.x > 0 ? 1 : -1;
      let dirY = y - this.y > 0 ? 1 : -1;
      if (x !== this.x) {
        for (const piece of pieces) {
          for (let i = 1; i < Math.abs(x - this.x); i++) {
            if (piece.x === this.x + i * dirX && piece.y === this.y)
              return false;
          }
        }
      } else {
        for (const piece of pieces) {
          for (let i = 1; i < Math.abs(y - this.y); i++) {
            if (piece.x === this.x && piece.y === this.y + i * dirY)
              return false;
          }
        }
      }
    }

    // queen moves
    if (this.type === "Q" || this.type === "q") {
      if (x !== this.x && y !== this.y) {
        let diffX = Math.abs(x - this.x);
        let diffY = Math.abs(y - this.y);
        if (diffX !== diffY) return false;
        let dirX = x - this.x > 0 ? 1 : -1;
        let dirY = y - this.y > 0 ? 1 : -1;
        for (const piece of pieces) {
          for (let i = 1; i < diffX; i++) {
            if (piece.x === this.x + i * dirX && piece.y === this.y + i * dirY)
              return false;
          }
        }
      } else {
        let dirX = x - this.x > 0 ? 1 : -1;
        let dirY = y - this.y > 0 ? 1 : -1;
        if (x !== this.x) {
          for (const piece of pieces) {
            for (let i = 1; i < Math.abs(x - this.x); i++) {
              if (piece.x === this.x + i * dirX && piece.y === this.y)
                return false;
            }
          }
        } else {
          for (const piece of pieces) {
            for (let i = 1; i < Math.abs(y - this.y); i++) {
              if (piece.x === this.x && piece.y === this.y + i * dirY)
                return false;
            }
          }
        }
      }
    }

    // king moves
    if (this.type === "K" || this.type === "k") {
      let diffX = Math.abs(x - this.x);
      let diffY = Math.abs(y - this.y);
      if (diffX > 1 || diffY > 1) return false;
    }

    for (const piece of pieces) {
      if (
        piece !== this &&
        pieceData[this.type].color === pieceData[piece.type].color &&
        piece.x === x &&
        piece.y === y
      )
        return false;
    }

    return true;
  };
}

export default Piece;
