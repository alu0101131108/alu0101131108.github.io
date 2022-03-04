/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @desc Main functions which use Chess Module in order to draw
*       a chess board and compute 8 queens problem solutions.
* @since 01/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P11-Ajedrez}
*/

import {Chess} from './chess.js';

const ALGEBRAIC_NOTATION = document.querySelector('#algebraic-notation');
const CANVAS = document.querySelector('#chess-canvas');
const CHESS = new Chess(CANVAS);

/**
 * This function will draw an empty board and attach event listeners to buttons.
 */
function initialize() {
  CHESS.emptyBoard();
  const START_BUTTON = document.querySelector('#start-match-button');
  START_BUTTON.addEventListener('click', beginChess);
  const SOLUTION_BUTTON = document.querySelector('#generate-solution-button');
  SOLUTION_BUTTON.addEventListener('click', generateSolution);
  const ALGEBRAIC_NOTATION = document.querySelector('#algebraic-notation');
  ALGEBRAIC_NOTATION.textContent = 
      'Check the algebraic notation for the generated solution here!';
}

/**
 * This function will draw randomly, one of the 92 solutions for eight queens
 * problem in the canvas.
 */
function generateSolution() {
  const RANDOM_SOLUTION = Math.floor(Math.random() * CHESS.getNumberOfSolutions());
  CHESS.drawSolution(RANDOM_SOLUTION);
  const SOLUTION = CHESS.getAlgebraicNotation(RANDOM_SOLUTION);
  ALGEBRAIC_NOTATION.textContent = SOLUTION;
}

/**
 * This function will draw the begining set of pieces of a regular chess match
 * into the canvas.
 */
function beginChess() {
  CHESS.beginChess();
  ALGEBRAIC_NOTATION.textContent = 
      'Check the algebraic notation for the generated solution here!';
}


window.initialize = initialize;
window.generateSolution = generateSolution;
window.beginChess = beginChess;