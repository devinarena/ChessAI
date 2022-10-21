import { pieceImage, PIECE_INDICES, SPRITE_SIZE } from "./imageloader";
import pieceData from "./pieces";

class Piece {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
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
   * @returns {boolean} whether the move was successful
   */
  move = (x, y) => {
    if (this.isValidMove(x, y)) {
      this.x = x;
      this.y = y;
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
  isValidMove = (x, y) => {
    // pawn moves
    if (this.type === "P" || this.type === "p") {
      return this.x - x === 0 && this.y - y === (this.type === "P" ? 1 : -1);
    }
    return true;
  };
}

export default Piece;
