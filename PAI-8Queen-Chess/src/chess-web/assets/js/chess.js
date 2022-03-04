/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Chess
* @desc ES6 Module to represent a chess table and also generate
*       8 queens problem solutions.
* @since 01/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P11-Ajedrez}
*/

/**
 * It will be usefull for drawing a chess board into a canvas and 
 * showing diverse solutions for eight queens problem.
 */
class Chess {
  /** Static property. Represents the size in rows or columns of the board. */
  static BOARD_SIZE = () => {
    return 8;
  }

  /** Static property. Represents board light color. */
  static LIGHT_COLOR = () => {
    return '#C1AD9E';
  }

  /** Static property. Represents board dark color. */
  static DARK_COLOR = () => {
    return '#855E42';
  }

  /** @private */
  #solutions; /** It will contain all possible solutions */
  #canvas;    /** HTML Element to output graphics */
  #board;     /** Matrix to store pieces id on board positions */

  /**
   * It will set passed canvas as a property, it will also call the function
   * that computes all solutions to store them in #solutions property and it
   * will set an empty template for #board property.
   * @param {HTMLElement} passedCanvas Canvas donde se realizarán los dibujos.
   */
  constructor(passedCanvas) {
    this.#canvas = passedCanvas;
    this.#solutions = [];
    this.#computeSolutions();

    this.#board = [];
    for (let i = 0; i < Chess.BOARD_SIZE(); i++) {
      this.#board.push([]);
      for (let j = 0; j < Chess.BOARD_SIZE(); j++) {
        this.#board[i].push('');
      }
    }
  }

  /** @private */
  /**
   * Creates an empty board and then uses it to calculate all possible
   * solutions by calling #recursiveEigthQueens(), which will also store
   * them in #solutions property.
   */
  #computeSolutions() {
    let board = [];
    for (let row = 0; row < Chess.BOARD_SIZE(); row++) {
      board[row] = [];
      for (let column = 0; column < Chess.BOARD_SIZE(); column++) {
        board[row][column] = 0;
      }
    }
    this.#recursiveEigthQueens(board, 0);
  }

  /** @private */
  /**
   * Recursive function that finds all solutions for the Eigth Queens problem
   * and stores them in #solutions property. In order to do so, and considering
   * that in every solution each column will contain exactly one queen, queens
   * are located in safe board positions, which means a position where no other
   * queen can attack. Each time all columns contain exactly one queen, solution
   * is stored. Then it undoes the last queen insertion, passes over it and 
   * finds a different one. 
   * @param {Array} board Stores possible solutions.
   * @param {Number} column Column index where solutions will be explored.
   */
  #recursiveEigthQueens(board, column) {
    if (column === Chess.BOARD_SIZE()) {
      // Needed because of JS array references.
      this.#solutions.push(board.map((row) => {
        return row.slice();
      }));
    } else {
      for (let row = 0; row < Chess.BOARD_SIZE(); row++) {
        if (this.#isSafe(board, row, column)) {
          // Find solutions by taking this path.
          board[row][column] = 1;
          this.#recursiveEigthQueens(board, column + 1);
          // Undo that step in order to find another solution.
          board[row][column] = 0;
        }
      }
    }
  }

  /** @private */
  /**
   * Evaluates if placing a queen on row-column position makes the
   * board solution invalid. It does this by checking if there is 
   * any queen in the evaluated queen's attack range.
   * @param {Array} board Board with queen positions to evaluate.
   * @param {Number} row Row index of evaluated queen.
   * @param {Number} column Column index of evaluated queen.
   * @return {Boolean} True if board is safe with given queen added.
   */
  #isSafe(board, row, column) {
    for (let i = 0; i < column; i++) {
      if (board[row][i] === 1) {
        return false;
      }
    }

    for (let i = row, j = column; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }

    for (let i = row, j = column; j >= 0 && i < Chess.BOARD_SIZE(); i++, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Traduces one of the computed solutions, from an Array of Arrays, 
   * to a string with the algebraic representation of each queen position.
   * @param {Number} index Index of the solution to traduce.
   * @return {String} String representation.
   */
  getAlgebraicNotation(index) {
    const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let queenPositions = [];
    for (let column = 0; column < Chess.BOARD_SIZE(); column++) {
      for (let row = 0; row < Chess.BOARD_SIZE(); row++) {
        if (this.#solutions[index][row][column] === 1) {
          queenPositions.push(LETTERS[column] + (Chess.BOARD_SIZE() - row).toString());
          break;
        }
      }
    }
    return 'Queens are situated at: ' + queenPositions.join(', ') + '.';
  }

  /**
   * Returns number of solutions computed.
   * @return {Number} Solutions computed.
   */
  getNumberOfSolutions() {
    return this.#solutions.length;
  }
  
  /**
   * Draws an empty colored chess board on the canvas.
   */
  emptyBoard() {
    // Draw squares.
    const CONTEXT = this.#canvas.getContext('2d');
    const CELL_SIZE = this.#canvas.width / Chess.BOARD_SIZE(); 
    for (let i = 0; i < Chess.BOARD_SIZE(); i++) {
      for (let j = 0; j < Chess.BOARD_SIZE(); j++) {
        CONTEXT.fillStyle =
            (i + j) % 2 === 0 ? Chess.LIGHT_COLOR() : Chess.DARK_COLOR();
        CONTEXT.fillRect(CELL_SIZE * i, CELL_SIZE * j, CELL_SIZE, CELL_SIZE);
      }
    }
    // Empty this.#board values.
    this.#board = [];
    for (let i = 0; i < Chess.BOARD_SIZE(); i++) {
      this.#board.push([]);
      for (let j = 0; j < Chess.BOARD_SIZE(); j++) {
        this.#board[i].push('');
      }
    }
  }

  /** @private */
  /**
   * Will iterate over this.#board and draw corresponding piece image
   * for each cell.
   */
  #drawPieces() {
    const CONTEXT = this.#canvas.getContext('2d');
    const CELL_SIZE = this.#canvas.width / Chess.BOARD_SIZE(); 
    for (let i = 0; i < Chess.BOARD_SIZE(); i++) {
      for (let j = 0; j < Chess.BOARD_SIZE(); j++) {
        const IMAGE = new Image(0, 0);
        switch (this.#board[i][j]) {
          case 'BP':
            IMAGE.src = './img/BlackPawn.png';
            break;
          case 'BB':
            IMAGE.src = './img/BlackBishop.png';
            break;
          case 'BK':
            IMAGE.src = './img/BlackKing.png';
            break;
          case 'BH':
            IMAGE.src = './img/BlackKnight.png';
            break;
          case 'BQ':
            IMAGE.src = './img/BlackQueen.png';
            break;
          case 'BT':
            IMAGE.src = './img/BlackRook.png';
            break;
          case 'WP':
            IMAGE.src = './img/WhitePawn.png';
            break;
          case 'WB':
            IMAGE.src = './img/WhiteBishop.png';
            break;
          case 'WK':
            IMAGE.src = './img/WhiteKing.png';
            break;
          case 'WH':
            IMAGE.src = './img/WhiteKnight.png';
            break;
          case 'WQ':
            IMAGE.src = './img/WhiteQueen.png';
            break;
          case 'WT':
            IMAGE.src = './img/WhiteRook.png';
            break;
          case '':
            break;
          default:
            console.log('Unrecognized chess piece.');
            break;
        }
        IMAGE.onload = () => {
          CONTEXT.drawImage(IMAGE, j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        };
      }
    }
  }

  /**
   * Sets this.#board to the display of a chess board with
   * the initial position of pieces corresponding to the
   * begin of a chess match.
   */
  beginChess() {
    this.emptyBoard();
    this.#board = [
      ['BT', 'BH', 'BB', 'BQ', 'BK', 'BB', 'BH', 'BT'],
      ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
      ['WT', 'WH', 'WB', 'WQ', 'WK', 'WB', 'WH', 'WT']
    ];
    this.#drawPieces();
  }
  
  /**
   * Sets this.#board to the display of the computed solution. It will be
   * represented as a chess board with a queen on each computed position.
   * @param {Number} index Index of the solution to draw.
   */
  drawSolution(index) {
    this.emptyBoard();
    for (let i = 0; i < Chess.BOARD_SIZE(); i++) {
      for (let j = 0; j < Chess.BOARD_SIZE(); j++) {
        this.#board[i][j] = this.#solutions[index][i][j] === 1 ? 
        'BQ' : '';
      }
    }
    this.#drawPieces();
  }
};

export {Chess};
