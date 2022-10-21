/**
 * @file index.js
 * @author Devin Arena
 * @description Entry point for a chess AI.
 * @since 10/21/2022
 **/

import { aiMove, initAI, minimax } from "./ai";
import Piece from "./piece";
import pieceData from "./pieces";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = canvas.width / 8;

let pieces = [];

let selectedPiece;
let mouseX;
let mouseY;
let whiteMove = true;

const init = () => {
  // FEN string for the starting position
  const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  loadPieces(fen);

  initAI("black");

  setInterval(update, 1000 / 60);
};

/**
 * Loads pieces from the FEN string.
 */
const loadPieces = (fen) => {
  const rows = fen.split("/");
  for (let i = 0; i < rows.length; i++) {
    let currentRow = rows[i];
    let currentColumn = 0;
    for (let j = 0; j < currentRow.length; j++) {
      const currentChar = currentRow[j];
      if (isNaN(currentChar)) {
        pieces.push(new Piece(currentColumn, i, TILE_SIZE, currentChar));
        currentColumn++;
      } else {
        currentColumn += parseInt(currentChar);
      }
    }
  }
};

const update = () => {
  draw();

  if (!whiteMove) {
    // generate move
    const [score, move] = minimax(pieces, 3, false);
    console.log(move);
    console.log(score);
    // apply move
    aiMove(move.piece, move.destX, move.destY, pieces);
    whiteMove = true;
  }
};

const draw = () => {
  drawGrid();

  // render pieces
  for (const piece of pieces) {
    if (piece !== selectedPiece) piece.render(ctx);
    else piece.render(ctx, mouseX - TILE_SIZE / 2, mouseY - TILE_SIZE / 2);
  }
};

/**
 * Renders the checkerboard grid to the screen.
 */
const drawGrid = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? "white" : "grey";
      ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
};

/**
 * Handles selecting and "picking up" a piece.
 */
canvas.addEventListener("mousedown", (e) => {
  if (selectedPiece) return;
  if (!whiteMove) return;
  const x = Math.floor(e.offsetX / TILE_SIZE);
  const y = Math.floor(e.offsetY / TILE_SIZE);
  for (const piece of pieces) {
    if (piece.x === x && piece.y === y && piece.isColor("white")) {
      selectedPiece = piece;
      mouseX = e.clientX - canvas.getBoundingClientRect().left;
      mouseY = e.clientY - canvas.getBoundingClientRect().top;
      break;
    }
  }
});

/**
 * Handles dropping a piece.
 */
canvas.addEventListener("mouseup", (e) => {
  const x = Math.floor(e.offsetX / TILE_SIZE);
  const y = Math.floor(e.offsetY / TILE_SIZE);
  if (selectedPiece) {
    if (selectedPiece.move(x, y, pieces)) {
      // check if there is a piece in the way
      for (const piece of pieces) {
        if (piece === selectedPiece) continue;
        if (piece.x === x && piece.y === y) {
          pieces.splice(pieces.indexOf(piece), 1);
          break;
        }
      }

      whiteMove = false;
    }

    selectedPiece = null;
  }
});

/**
 * Handles moving a piece while it is being dragged.
 */
canvas.addEventListener("mousemove", (e) => {
  if (selectedPiece) {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
  }
});

init();
