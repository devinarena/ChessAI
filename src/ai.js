/**
 * @file ai.js
 * @author Devin Arena
 * @description Handles decision making for the chess AI.
 * @since 10/21/2022
 **/

import Move from "./move";
import Piece from "./piece";
import pieceData from "./pieces";

let color = "white";

let moveStack = [];

const initAI = (_color) => {
  color = _color;
};

/**
 * Generates a move for the AI, currently completely random.
 *
 * @param {List} pieces the list of pieces on the board
 * @returns {Move} the move the AI will make
 */
const generateAllMoves = (pieces) => {
  const possible = [];
  // get all pieces of the same color
  for (const piece of pieces) {
    if (piece.isColor(color)) {
      // generate their moves
      const moves = piece.generateMoves(pieces);
      if (moves.length > 0) {
        possible.push(
          moves.map(
            (move) => new Move(piece, move[0], move[1], piece.x, piece.y)
          )
        );
      }
    }
  }
  return possible;
};

const aiMove = (piece, x, y, pieces) => {
  const oldX = piece.x;
  const oldY = piece.y;
  if (piece.move(x, y, pieces)) {
    let taken = null;

    // check if there is a piece in the way
    for (const attacked of pieces) {
      if (attacked === piece) continue;
      if (attacked.x === x && attacked.y === y) {
        taken = attacked;
        pieces.splice(pieces.indexOf(attacked), 1);
      }
    }

    moveStack.push(new Move(piece, x, y, oldX, oldY, taken));

    return true;
  }

  return false;
};

const aiUndo = (pieces) => {
  if (moveStack.length === 0) return;
  const move = moveStack.pop();
  move.piece.x = move.fromX;
  move.piece.y = move.fromY;
  move.piece.moves--;

  if (move.taken) {
    pieces.push(move.taken);
  }
};

const evaluateBoard = (pieces) => {
  let score = 0;
  for (const piece of pieces) {
    score += pieceData[piece.type].worth;
  }
  return score;
};

const minimax = (pieces, depth, maximizing) => {
  if (depth === 0) {
    console.log(evaluateBoard(pieces));
    return [evaluateBoard(pieces), null];
  }
  let bestMove = null;
  if (maximizing) {
    let bestScore = -Infinity;
    const moves = generateAllMoves(pieces);
    moves.sort((a, b) => {
      return 0.5 - Math.random();
    }); // completely random order
    for (const pieceMoves of moves) {
      let undo = false;
      for (const move of pieceMoves) {
        undo = aiMove(move.piece, move.destX, move.destY, pieces);
        const [score, nmove] = minimax(pieces, depth - 1, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        if (undo) aiUndo(pieces);
      }
    }
    return [bestScore, bestMove];
  } else {
    let bestScore = Infinity;
    const moves = generateAllMoves(pieces);
    moves.sort((a, b) => {
      return 0.5 - Math.random();
    }); // completely random order
    for (const pieceMoves of moves) {
      let undo = false;
      for (const move of pieceMoves) {
        undo = aiMove(move.piece, move.destX, move.destY, pieces);
        const [score, nmove] = minimax(pieces, depth - 1, true);
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        if (undo) aiUndo(pieces);
      }
    }
    return [bestScore, bestMove];
  }
};

export { initAI, generateAllMoves, minimax, aiMove };
