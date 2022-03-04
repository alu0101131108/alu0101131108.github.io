/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Model
* @desc ES6 Module that contains the Model part of a MVC
* app to build a halma like browser game.
* @since 14/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P13-MVC-Halma}
*/

import { Chip } from './chip.js'

/**
 * This class will contain the necessary data structures for creating a 
 * Halma game, or other games that may share certain characteristics
 * as the use of a board with moving chips.
 */
class Model {

  /** @private */
  #board        /** Matrix of chips that represents the game board */
  #boardCells   /** Number of cells in the game board */
  #initialChips /** Number of chips that will be created at the begining */
  #counter      /** Keeps track of the total number of moves made */
  #movingChip   /** Keeps track of which chip is currently moving */
  #chaining     /** Keeps track of chain moves made */

  /**
   * Sets given parameters as properties and also give initial values
   * to the counter and board properties.
   * @param {Number} boardCells 
   * @param {Number} initialChips
   */
  constructor(boardCells, initialChips) {
    this.#boardCells = boardCells;
    this.#initialChips = initialChips;
    this.#movingChip = undefined;
    this.#chaining = false;
    this.resetCounter();
    this.resetBoard();
  }

  /**
   * Getter for board property.
   * @return {Array}
   */
  getBoard() {
    return this.#board;
  }

  /**
   * Getter for boardCells property.
   * @return {Number}
   */
  getBoardCells() {
    return this.#boardCells;
  }

  /**
   * Getter for initialChips property.
   * @return {Number}
   */
  getInitialChips() {
    return this.#initialChips;
  }

  /**
   * Getter for counter property.
   * @return {Number}
   */
  getCounter() {
    return this.#counter;
  }

  /**
   * Getter for movingChip property.
   * @return {Boolean}
   */
  getMovingChip() {
    return this.#movingChip;
  }

  /**
   * Setter for movingChip property.
   * @param {Number} row Row index of the new moving chip.
   * @param {Number} column Column index of the new moving chip.
   */
  setMovingChip(row, column) {
    this.#movingChip = new Chip(row, column);
  }

  /**
   * Getter for chaining property.
   * @return {Boolean}
   */
  getChaining() {
    return this.#chaining;
  }

  /**
   * Setter for chaining property.
   * @param {Boolean} chaining New chaining state.
   */
  setChaining(chaining) {
    this.#chaining = chaining;
  }

  /**
   * This function resets the counter property to 0.
   */
  resetCounter() {
    this.#counter = 0;
  }

  /**
   * This function modifies counter property by adding one to its value.
   */
  incrementCounter() {
    this.#counter++;
  }

  /**
   * This function will clear any chips inside board property and set 
   * all values as false, meaning they are empty.
   */
  resetBoard() {
    const BOARD_CELLS_SQRT = Math.trunc(Math.sqrt(this.#boardCells));
    this.#board = [];
    for (let row = 0; row < BOARD_CELLS_SQRT; row++) {
      this.#board.push([]);
      for (let column = 0; column < BOARD_CELLS_SQRT; column++) {
        this.#board[row].push(false);
      }
    }
  }

  /**
   * This function will check if there is a chip inside the board
   * in the given indexes as parameters. 
   * @param {Number} row Row index of chip to check
   * @param {Number} column Column index of chip to check
   * @return {Boolean}
   */
  isChipIn(row, column) {
    return this.#board[row][column] === false ? false : true;
  }

  /**
   * This function will check if the chip in the given indexes as parameters
   * is currently moving.
   * @param {Number} row  Row index of chip to check 
   * @param {Number} column Column index of chip to check
   * @return {Boolean}
   */
  isChipMoving(row, column) {
    if (!this.isChipIn(row, column)) {
      throw new Error('Model::isChipMoving() on empty cell');
    }
    return this.#board[row][column].getMoving();
  }

  /**
   * This function will set the chip in given indexes as parameters as
   * the new moving chip.
   * @param {Number} row Row index of the new moving chip.
   * @param {Number} column Column index of the new moving chip.
   */
  setChipMoving(row, column) {
    if (!this.isChipIn(row, column)) {
      throw new Error('Model::setChipMoving() on empty cell');
    }
    this.#board[row][column].setMoving(true);
    this.#movingChip = this.#board[row][column];
  }

  /**
   * This function will add a chip inside given indexes as parameters.
   * @param {Number} row Row index of the chip to add.
   * @param {Number} column Column index of the chip to add.
   */
  addChip(row, column) {
    this.#board[row][column] = new Chip(row, column);
  }

  /**
   * This function will try to move a chip from its old position to a new
   * position specified as a paramter.
   * @param {Number} row Old row index.
   * @param {Number} column Old column index.
   * @param {Number} newRow New row index.
   * @param {Number} newColumn New column index.
   */
  moveChip(row, column, newRow, newColumn) {
    if (!this.isChipIn(row, column) || this.isChipIn(newRow, newColumn)) {
      throw new Error('Model::moveChip() on empty cell or to filled cell.');
    }
    this.#board[row][column] = false;
    this.#board[newRow][newColumn] = new Chip(newRow, newColumn);
    this.#board[newRow][newColumn].setMoving(true);
    this.#movingChip = this.#board[newRow][newColumn];
  }

  /**
   * This function will set all chips moving property to false and
   * also will set the movingChip property as undefined since there
   * won't be any chip moving.
   */
  endAllChipsMoving() {
    const BOARD_CELLS_SQRT = Math.trunc(Math.sqrt(this.#boardCells));
    for (let row = 0; row < BOARD_CELLS_SQRT; row++) {
      for (let column = 0; column < BOARD_CELLS_SQRT; column++) {
        if (this.isChipIn(row, column)) {
          this.#board[row][column].setMoving(false);
        }
      }
    }
    this.#movingChip = undefined;
  }
}

export { Model };