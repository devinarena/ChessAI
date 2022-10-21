import { pieceImage, PIECE_INDICES, SPRITE_SIZE } from "./imageloader";

class Piece {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  render = (ctx, x=this.x * this.size, y=this.y * this.size) => {
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
}

export default Piece;
