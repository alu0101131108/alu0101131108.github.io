/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Chip
* @desc ES6 Module that contains a Chip class. This are 
* ment for Halma like game creation.
* @since 14/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P13-MVC-Halma}
*/

/**
 * This class will facilitate the representation of board Chips from
 * Halma alike games.
 */
class Chip {

  /** @private */
  #moving   /** Boolean value that indicates if the chip is in moving state. */
  #row      /** Represents the numeric index of the row where the chip is */
  #column   /** Represents the numeric index of the column where the chip is */

  /**
   * It will set parameter values to the corresponding properties.
   * @param {Number} row Index of the row where the chip is.
   * @param {Number} column Index of the column where the chip is.
   */
  constructor(row, column) {
    this.#row = row;
    this.#column = column;
    this.#moving = false;
  }

  /**
   * Getter for row property.
   * @return {Number} 
   */
  getRow() {
    return this.#row;
  }

  /**
   * Setter for row property.
   * @param {Number} row New row index.
   */
  setRow(row) {
    this.#row = row;
  }

  /**
   * Getter for column property.
   * @return {Number}
   */
  getColumn() {
    return this.#column;
  }

  /**
   * Setter for column property.
   * @param {Number} column New column index.
   */
  setColumn(column) {
    this.#column = column;
  }

  /**
   * Getter for moving state.
   * @return {Boolean}
   */
  getMoving() {
    return this.#moving;
  }

  /**
   * Setter for moving state.
   * @param {Boolean} movingState  New moving state.
   */
  setMoving(movingState) {
    this.#moving = movingState;
  }

}

export {Chip};
