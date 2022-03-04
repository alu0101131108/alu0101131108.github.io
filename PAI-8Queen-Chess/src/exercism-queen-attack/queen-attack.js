/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @desc Exercism platform exercise. Consists on a class to represent
*       two chess table positions where there are 2 queens. It also 
*       checks if both the queens are in each other's attack range.
* @since 01/05/2021
* @author Sebastián Daniel Tamayo Guzmán
*/

/**
 * It will have two chess table positions, where 2 queens are suppossed to be.
 * Also computes if both queens are in each other's attack range.
 */
class QueenAttack {

  /** @private */
  #black; /** Position of black queen. */
  #white; /** Position of white queen. */

  /**
   * Will set coordinets for two queens. Default value will be regular queen
   * position in chess.
   * @param {Object} QueensCoordinates  It will have two properties, each will
   * contain one queen`s coordinates.
   */
  constructor({
    black: [blackRow, blackColumn] = [],
    white: [whiteRow, whiteColumn] = [],
  } = {}) {
    
    blackRow = typeof blackRow !== 'undefined' ? blackRow : 0;
    blackColumn = typeof blackColumn !== 'undefined' ? blackColumn : 3;
    whiteRow = typeof whiteRow !== 'undefined' ? whiteRow : 7;
    whiteColumn = typeof whiteColumn !== 'undefined' ? whiteColumn : 3;
    
    if (blackRow < 0 || blackRow > 7 ||
        blackColumn < 0 || blackColumn > 7 ||
        whiteRow < 0 || whiteRow > 7 ||
        whiteColumn < 0 || whiteColumn > 7) {
      throw new Error('Queen must be placed on the board');
    }

    if (blackRow === whiteRow && blackColumn === whiteColumn) {
      throw new Error('Queens cannot share the same space');
    }

    this.#black = [blackRow, blackColumn];
    this.#white = [whiteRow, whiteColumn];
  }

  /**
   * Getter for white attr.
   * @return {Array} White queen's coordinates.
   */
  get white() {
    return this.#white;
  }

  /**
   * Getter for black attr.
   * @return {Array} black queen's coordinates.
   */
  get black() {
    return this.#black;
  }
  
  /**
   * This function will evaluate if both queens can attack.
   * @return {Boolean} 
   */
  get canAttack() {

    // Check if both are in horizontal or vertical attack range.
    if (this.#black[0] === this.#white[0] ||
        this.#black[1] === this.#white[1]) {
      return true;
    }

    // Check if white is on diagonal black's attack range.
    let attackRow = this.#black[0];
    let attackColumn = this.#black[1];
    // Up right search.
    while (attackRow >= 0 && attackColumn < 8) {
      if (attackRow === this.#white[0] &&
        attackColumn === this.#white[1]) {
        return true;
      }
      attackRow--;
      attackColumn++;
    }

    attackRow = this.#black[0];
    attackColumn = this.#black[1];
    // Up left search.
    while (attackRow >= 0 && attackColumn >= 0) {
      if (attackRow === this.#white[0] &&
        attackColumn === this.#white[1]) {
        return true;
      }
      attackRow--;
      attackColumn--;
    }

    attackRow = this.#black[0];
    attackColumn = this.#black[1];
    // Bottom right search.
    while (attackRow < 8 && attackColumn < 8) {
      if (attackRow === this.#white[0] &&
        attackColumn === this.#white[1]) {
        return true;
      }
      attackRow++;
      attackColumn++;
    }

    attackRow = this.#black[0];
    attackColumn = this.#black[1];
    // Bottom left search.
    while (attackRow < 8 && attackColumn >= 0) {
      if (attackRow === this.#white[0] &&
        attackColumn === this.#white[1]) {
        return true;
      }
      attackRow++;
      attackColumn--;
    }

    return false;
  }

  /**
   * Returns the string representing the board with each queens position.
   * @return {String} Board string representation.
   */
  toString() {
    let board = [];
    let row = [];
    for (let rows = 0; rows < 8; rows++) {
      for (let columns = 0; columns < 8; columns++) {
        if (rows === this.#black[0] && columns === this.#black[1]) {
          row.push('B');
        }
        else if (rows === this.#white[0] && columns === this.#white[1]) {
          row.push('W');
        }
        else {
          row.push('_');
        }
      }
      board.push(row.join(' ')); 
      row = [];
    }
    return board.join('\n');
  }
}

export {QueenAttack};