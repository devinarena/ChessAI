
/**
* @file move.js
* @author Devin Arena
* @description Stores information about a move.
* @since 10/21/2022
**/

class Move {
    constructor(piece, destX, destY, fromX, fromY, taken=null) {
        this.piece = piece;
        this.destX = destX;
        this.destY = destY;
        this.fromX = fromX;
        this.fromY = fromY;
        this.taken = taken;
    }
}

export default Move;