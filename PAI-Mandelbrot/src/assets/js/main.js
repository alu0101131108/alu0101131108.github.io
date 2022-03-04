/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @desc Main functions which use the Mandelbrot Module in order to draw
*       a mandelbrot set through a web page.
* @since 16/04/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P09-Canvas/blob/master/p09_Canvas.md}
*/

import {Mandelbrot} from './mandelbrot.js';
import {Board} from './board.js';

/**
 * This function will find input values on a HTML page, and then create the
 * graphic representation using a canvas of the corresponding Mandelbrot set.
 */
function drawSet() {
  document.getElementById('draw-state').innerHTML = 'loading...';
  const CANVAS = document.getElementById('mandelbrot-canvas');
  const MIN_X = Number(document.getElementById('min-x-axis').value);
  const MAX_X = Number(document.getElementById('max-x-axis').value);
  const MIN_Y = Number(document.getElementById('min-y-axis').value);
  const MAX_Y = Number(document.getElementById('max-y-axis').value);
  const MAX_ITERATIONS = Number(document.getElementById('max-iterations-draw').value);
  const MANDELBROT = new Mandelbrot(CANVAS, MAX_ITERATIONS, MIN_X, MAX_X, MIN_Y, MAX_Y);
  MANDELBROT.draw();
  document.getElementById('draw-state').innerHTML = 'Draw is completed!';
}

/**
 * This function will find input values on a HMTL page, and then compute the
 * area and error of the Mandelbrot Set with given inputs.
 */
function computeArea() {
  const CANVAS = document.getElementById('mandelbrot-canvas');
  const RANDOM_NUMBERS = Number(document.getElementById('n-random-numbers').value);
  const MAX_ITERATIONS = Number(document.getElementById('max-iterations-area').value);
  const MANDELBROT = new Mandelbrot(CANVAS);
  MANDELBROT.computeArea(RANDOM_NUMBERS, MAX_ITERATIONS);
}

/**
 * This function will make use of Board class to draw Geometric figures into
 * an HTML canvas.
 */
function drawBoard() {
  const CANVAS = document.getElementById('board');
  const CONTEXT = CANVAS.getContext('2d');
  CONTEXT.canvas.width  = window.innerWidth - 100;
  CONTEXT.canvas.height = window.innerHeight - 200;
  const BOARD = new Board(CANVAS);
  BOARD.draw();
}

window.drawSet = drawSet;
window.computeArea = computeArea;
window.drawBoard = drawBoard;