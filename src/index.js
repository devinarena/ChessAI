/**
 * @file index.js
 * @author Devin Arena
 * @description Entry point for a chess AI.
 * @since 10/21/2022
 **/

import { SPRITE_SIZE } from "./imageloader";
import Piece from "./piece";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = canvas.width / 8;

const pieces = [];

let selectedPiece;
let mouseX;
let mouseY;

const init = () => {
  // FEN string for the starting position
  const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  loadPieces(fen);

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
};

const draw = () => {
  drawGrid();
};

const drawGrid = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? "white" : "grey";
      ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
  for (const piece of pieces) {
    if (piece !== selectedPiece) piece.render(ctx);
    else piece.render(ctx, mouseX - TILE_SIZE / 2, mouseY - TILE_SIZE/ 2);
  }
};

canvas.addEventListener("mousedown", (e) => {
  if (selectedPiece) return;
  const x = Math.floor(e.offsetX / TILE_SIZE);
  const y = Math.floor(e.offsetY / TILE_SIZE);
  for (const piece of pieces) {
    if (piece.x === x && piece.y === y) {
      selectedPiece = piece;
      mouseX = e.clientX - canvas.getBoundingClientRect().left;
      mouseY = e.clientY - canvas.getBoundingClientRect().top;
      break;
    }
  }
});

canvas.addEventListener("mouseup", (e) => {
  const x = Math.floor(e.offsetX / TILE_SIZE);
  const y = Math.floor(e.offsetY / TILE_SIZE);
  if (selectedPiece) {
    selectedPiece.x = x;
    selectedPiece.y = y;
    selectedPiece = null;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (selectedPiece) {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
  }
});

init();
