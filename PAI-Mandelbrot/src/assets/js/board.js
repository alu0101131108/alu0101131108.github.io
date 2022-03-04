/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Mandelbrot
* @desc ES6 Module to use and draw Geometric figures in a HTML Canvas.
* @since 21/04/2021
* @author Sebastián Daniel Tamayo Guzmán
*/

import {Rectangle} from './rectangle.js'

/**
 * Board class, it will use a set of geometric figure classes in order to
 * draw them through a HTML canvas.
 */
class Board {
  /** @private */
  #canvas;
  /** @private */
  #context;
  /** @private */
  #width; 
  /** @private */
  #height; 

  /**
   * Constructor will set canvas related data estructures as atributtes in 
   * order to facilitate access to them.
   * @param {HTMLElement} passedCanvas Canvas to output graphics.
   */
  constructor(passedCanvas) {
    this.#canvas = passedCanvas;
    this.#context = this.#canvas.getContext('2d');
    this.#width = this.#canvas.width;
    this.#height = this.#canvas.height;
    this.#context.font = '20px Arial';
  }

  /**
   * This function will use diverse gemoetric figure classes in order to output
   * them through the canvas.
   */
  draw() {
    const SQUARE = new Rectangle(this.#canvas, 10, 10, 500, 500); 
    SQUARE.draw();
  }

};

export {Board};
