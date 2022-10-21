/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/imageloader.js":
/*!****************************!*\
  !*** ./src/imageloader.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PIECE_INDICES\": () => (/* binding */ PIECE_INDICES),\n/* harmony export */   \"SPRITE_SIZE\": () => (/* binding */ SPRITE_SIZE),\n/* harmony export */   \"pieceImage\": () => (/* binding */ pieceImage)\n/* harmony export */ });\n/**\r\n * @file imageloader.js\r\n * @author Devin Arena\r\n * @description Loads the chess piece image and splits it into a 2D array of images.\r\n * @since 10/21/2022\r\n **/\r\n\r\nconst PIECE_PATH = \"./pieces.png\";\r\n\r\nconst PIECE_INDICES = {\r\n    \"K\": 0,\r\n    \"Q\": 1,\r\n    \"B\": 2,\r\n    \"N\": 3,\r\n    \"R\": 4,\r\n    \"P\": 5,\r\n    \"k\": 6,\r\n    \"q\": 7,\r\n    \"b\": 8,\r\n    \"n\": 9,\r\n    \"r\": 10,\r\n    \"p\": 11\r\n}\r\n\r\nconst SPRITE_SIZE = 320;\r\n\r\nconst loadImage = (path) => {\r\n  const image = new Image();\r\n  image.src = path;\r\n  return image;\r\n};\r\n\r\nconst pieceImage = loadImage(\"./pieces.png\");\r\n\r\n\n\n//# sourceURL=webpack://chessai/./src/imageloader.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/**\r\n * @file index.js\r\n * @author Devin Arena\r\n * @description Entry point for a chess AI.\r\n * @since 10/21/2022\r\n **/\r\n\r\n\r\n\r\nconst canvas = document.getElementById(\"gameCanvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\n\r\nconst TILE_SIZE = canvas.width / 8;\r\n\r\nconst pieces = [];\r\n\r\nlet selectedPiece;\r\nlet mouseX;\r\nlet mouseY;\r\n\r\nconst init = () => {\r\n  // FEN string for the starting position\r\n  const fen = \"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR\";\r\n  loadPieces(fen);\r\n\r\n  setInterval(update, 1000 / 60);\r\n};\r\n\r\n/**\r\n * Loads pieces from the FEN string.\r\n */\r\nconst loadPieces = (fen) => {\r\n  const rows = fen.split(\"/\");\r\n  for (let i = 0; i < rows.length; i++) {\r\n    let currentRow = rows[i];\r\n    let currentColumn = 0;\r\n    for (let j = 0; j < currentRow.length; j++) {\r\n      const currentChar = currentRow[j];\r\n      if (isNaN(currentChar)) {\r\n        pieces.push(new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](currentColumn, i, TILE_SIZE, currentChar));\r\n        currentColumn++;\r\n      } else {\r\n        currentColumn += parseInt(currentChar);\r\n      }\r\n    }\r\n  }\r\n};\r\n\r\nconst update = () => {\r\n  draw();\r\n};\r\n\r\nconst draw = () => {\r\n  drawGrid();\r\n\r\n  // render pieces\r\n  for (const piece of pieces) {\r\n    if (piece !== selectedPiece) piece.render(ctx);\r\n    else piece.render(ctx, mouseX - TILE_SIZE / 2, mouseY - TILE_SIZE / 2);\r\n  }\r\n};\r\n\r\n/**\r\n * Renders the checkerboard grid to the screen.\r\n */\r\nconst drawGrid = () => {\r\n  for (let i = 0; i < 8; i++) {\r\n    for (let j = 0; j < 8; j++) {\r\n      ctx.fillStyle = (i + j) % 2 === 0 ? \"white\" : \"grey\";\r\n      ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);\r\n    }\r\n  }\r\n};\r\n\r\n/**\r\n * Handles selecting and \"picking up\" a piece.\r\n */\r\ncanvas.addEventListener(\"mousedown\", (e) => {\r\n  if (selectedPiece) return;\r\n  const x = Math.floor(e.offsetX / TILE_SIZE);\r\n  const y = Math.floor(e.offsetY / TILE_SIZE);\r\n  for (const piece of pieces) {\r\n    if (piece.x === x && piece.y === y) {\r\n      selectedPiece = piece;\r\n      mouseX = e.clientX - canvas.getBoundingClientRect().left;\r\n      mouseY = e.clientY - canvas.getBoundingClientRect().top;\r\n      break;\r\n    }\r\n  }\r\n});\r\n\r\n/**\r\n * Handles dropping a piece.\r\n */\r\ncanvas.addEventListener(\"mouseup\", (e) => {\r\n  const x = Math.floor(e.offsetX / TILE_SIZE);\r\n  const y = Math.floor(e.offsetY / TILE_SIZE);\r\n  if (selectedPiece) {\r\n    if (selectedPiece.move(x, y)) {\r\n      // check if the piece is being dropped on another piece to take\r\n      for (const piece of pieces) {\r\n        if (piece === selectedPiece) continue;\r\n        if (piece.x === x && piece.y === y) {\r\n          pieces.splice(pieces.indexOf(piece), 1);\r\n          break;\r\n        }\r\n      }\r\n    }\r\n\r\n    selectedPiece = null;\r\n  }\r\n});\r\n\r\n/**\r\n * Handles moving a piece while it is being dragged.\r\n */\r\ncanvas.addEventListener(\"mousemove\", (e) => {\r\n  if (selectedPiece) {\r\n    mouseX = e.clientX - canvas.getBoundingClientRect().left;\r\n    mouseY = e.clientY - canvas.getBoundingClientRect().top;\r\n  }\r\n});\r\n\r\ninit();\r\n\n\n//# sourceURL=webpack://chessai/./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _imageloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageloader */ \"./src/imageloader.js\");\n/* harmony import */ var _pieces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pieces */ \"./src/pieces.js\");\n\r\n\r\n\r\nclass Piece {\r\n  constructor(x, y, size, type) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.size = size;\r\n    this.type = type;\r\n  }\r\n\r\n  render = (ctx, x = this.x * this.size, y = this.y * this.size) => {\r\n    ctx.drawImage(\r\n      _imageloader__WEBPACK_IMPORTED_MODULE_0__.pieceImage,\r\n      (_imageloader__WEBPACK_IMPORTED_MODULE_0__.PIECE_INDICES[this.type] % 6) * _imageloader__WEBPACK_IMPORTED_MODULE_0__.SPRITE_SIZE,\r\n      Math.floor(_imageloader__WEBPACK_IMPORTED_MODULE_0__.PIECE_INDICES[this.type] / 6) * _imageloader__WEBPACK_IMPORTED_MODULE_0__.SPRITE_SIZE,\r\n      _imageloader__WEBPACK_IMPORTED_MODULE_0__.SPRITE_SIZE,\r\n      _imageloader__WEBPACK_IMPORTED_MODULE_0__.SPRITE_SIZE,\r\n      x,\r\n      y,\r\n      this.size,\r\n      this.size\r\n    );\r\n  };\r\n\r\n  /**\r\n   * Move the piece to a new position.\r\n   *\r\n   * @param {number} x the x coordinate of the piece\r\n   * @param {number} y the y coordinate of the piece\r\n   *\r\n   * @returns {boolean} whether the move was successful\r\n   */\r\n  move = (x, y) => {\r\n    if (this.isValidMove(x, y)) {\r\n      this.x = x;\r\n      this.y = y;\r\n      return true;\r\n    }\r\n    return false;\r\n  };\r\n\r\n  /**\r\n   * Checks if a move is valid.\r\n   *\r\n   * @param {number} x the x coordinate of the piece\r\n   * @param {number} y the y coordinate of the piece\r\n   *\r\n   * @returns {boolean} whether the move is valid\r\n   */\r\n  isValidMove = (x, y) => {\r\n    // pawn moves\r\n    if (this.type === \"P\" || this.type === \"p\") {\r\n      return this.x - x === 0 && this.y - y === (this.type === \"P\" ? 1 : -1);\r\n    }\r\n    return true;\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Piece);\r\n\n\n//# sourceURL=webpack://chessai/./src/piece.js?");

/***/ }),

/***/ "./src/pieces.js":
/*!***********************!*\
  !*** ./src/pieces.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * @file pieces.js\r\n * @author Devin Arena\r\n * @description Piece specific reference information.\r\n * @since 10/21/2022\r\n **/\r\n\r\nconst pawnValidMove = (piece, x, y) => {\r\n    return piece.y - y === 1;\r\n};\r\n\r\nconst pieceData = {\r\n    \"K\": {\r\n        \"color\": \"white\",\r\n        \"worth\": 1000,\r\n    },\r\n    \"Q\": {\r\n        \"color\": \"white\",\r\n        \"worth\": 9,\r\n    },\r\n    \"B\": {\r\n        \"color\": \"white\",\r\n        \"worth\": 3,\r\n    },\r\n    \"N\": {\r\n        \"color\": \"white\",\r\n        \"worth\": 3,\r\n    },\r\n    \"R\": {\r\n        \"color\": \"white\",\r\n        \"worth\": 5,\r\n    },\r\n    \"P\": {\r\n        \"color\": \"white\",\r\n        \"worth\": 1,\r\n    },\r\n    \"k\": {\r\n        \"color\": \"black\",\r\n        \"worth\": 1000,\r\n    },\r\n    \"q\": {\r\n        \"color\": \"black\",\r\n        \"worth\": 9,\r\n    },\r\n    \"b\": {\r\n        \"color\": \"black\",\r\n        \"worth\": 3,\r\n    },\r\n    \"n\": {\r\n        \"color\": \"black\",\r\n        \"worth\": 3,\r\n    },\r\n    \"r\": {\r\n        \"color\": \"black\",\r\n        \"worth\": 5,\r\n    },\r\n    \"p\": {\r\n        \"color\": \"black\",\r\n        \"worth\": 1,\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pieceData);\n\n//# sourceURL=webpack://chessai/./src/pieces.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;