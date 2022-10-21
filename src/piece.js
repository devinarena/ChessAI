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

  isColor = (color) => {
    return pieceData[this.type].color === color;
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
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    if (this.x === x && this.y === y) return false;

    // pawn moves
    if (this.type === "P" || this.type === "p") {
      if (Math.abs(this.x - x) === 1) {
        if (this.type === "P" && y !== this.y - 1) return false;
        if (this.type === "p" && y !== this.y + 1) return false;
        // check if there is a piece to capture
        const piece = pieces.find((piece) => piece.x === x && piece.y === y);
        if (!piece) return false;
        if (piece.isColor(this.isColor("white") ? "black" : "white")) {
          return true;
        }
        return false;
      }

      let diffY = y - this.y;
      if (this.type === "P") {
        if (this.moves === 0) {
          if (diffY !== -1 && diffY !== -2) return false;
          for (const piece of pieces) {
            if (piece.x === x && piece.y === y) return false;
            if (diffY === -2 && piece.x === x && piece.y === y - 1)
              return false;
          }
        } else {
          if (diffY !== -1) return false;
          for (const piece of pieces) {
            if (piece.x === x && piece.y === y) return false;
          }
        }
      } else {
        if (this.moves === 0) {
            if (diffY !== 1 && diffY !== 2) return false;
            for (const piece of pieces) {
              if (piece.x === x && piece.y === y) return false;
              if (diffY === 2 && piece.x === x && piece.y === y + 1)
                return false;
            }
        } else {
          if (diffY !== 1) return false;
          for (const piece of pieces) {
            if (piece.x === x && piece.y === y) return false;
          }
        }
      }
    }

    // knight moves
    if (this.type === "N" || this.type === "n") {
      let diffX = Math.abs(x - this.x);
      let diffY = Math.abs(y - this.y);
      if (!(diffX === 1 && diffY === 2) && !(diffX === 2 && diffY === 1))
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

  /**
   * Generates all possible moves for this type of piece in this position.
   *
   * @param {Array} pieces the pieces on the board
   */
  generateMoves = (pieces) => {
    let moves = [];
    if (this.type === "P" || this.type === "p") {
      let diffY = this.type === "P" ? -1 : 1;
      let diffY2 = this.type === "P" ? -2 : 2;
      let x = this.x;
      let y = this.y + diffY;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      if (this.moves === 0) {
        y = this.y + diffY2;
        if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      }
    }

    if (this.type === "N" || this.type === "n") {
      let x = this.x - 1;
      let y = this.y - 2;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      x = this.x + 1;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      y = this.y + 2;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      x = this.x - 1;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      x = this.x - 2;
      y = this.y - 1;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      y = this.y + 1;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      x = this.x + 2;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
      y = this.y - 1;
      if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
    }

    if (this.type === "B" || this.type === "b") {
      for (let i = 1; i < 7; i++) {
        let x = this.x + i;
        let y = this.y + i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x + i;
        let y = this.y - i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x - i;
        let y = this.y + i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x - i;
        let y = this.y - i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
    }

    if (this.type === "R" || this.type === "r") {
      for (let i = 1; i < 7; i++) {
        let x = this.x + i;
        let y = this.y;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x - i;
        let y = this.y;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x;
        let y = this.y + i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x;
        let y = this.y - i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
    }

    if (this.type === "Q" || this.type === "q") {
      for (let i = 1; i < 7; i++) {
        let x = this.x + i;
        let y = this.y + i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x + i;
        let y = this.y - i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x - i;
        let y = this.y + i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x - i;
        let y = this.y - i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x + i;
        let y = this.y;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x - i;
        let y = this.y;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x;
        let y = this.y + i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
      for (let i = 1; i < 7; i++) {
        let x = this.x;
        let y = this.y - i;
        if (!this.isValidMove(x, y, pieces)) break;
        moves.push([x, y]);
      }
    }

    if (this.type === "K" || this.type === "k") {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let x = this.x + i;
          let y = this.y + j;
          if (this.isValidMove(x, y, pieces)) moves.push([x, y]);
        }
      }
    }

    return moves;
  };
}

export default Piece;
