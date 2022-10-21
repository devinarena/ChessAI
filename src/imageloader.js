/**
 * @file imageloader.js
 * @author Devin Arena
 * @description Loads the chess piece image and splits it into a 2D array of images.
 * @since 10/21/2022
 **/

const PIECE_PATH = "./pieces.png";

const PIECE_INDICES = {
    "K": 0,
    "Q": 1,
    "B": 2,
    "N": 3,
    "R": 4,
    "P": 5,
    "k": 6,
    "q": 7,
    "b": 8,
    "n": 9,
    "r": 10,
    "p": 11
}

const SPRITE_SIZE = 320;

const loadImage = (path) => {
  const image = new Image();
  image.src = path;
  return image;
};

const pieceImage = loadImage("./pieces.png");

export { PIECE_INDICES, SPRITE_SIZE, pieceImage };