/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Mandelbrot
* @desc ES6 Module to represent Rectangles in a HTML Canvas.
* @since 21/04/2021
* @author Sebastián Daniel Tamayo Guzmán
*/

import {Polygon} from './polygon.js'

/**
 * Rectangle class. Will facilitate their representation on a canvas
 * and will facilitate the computation of their area. Inherits from Polygon
 * abstract class.
 */
class Rectangle extends Polygon {

  /** @private */
  #canvas;
  /** @private */
  #context;
  /** @private */
  #width; 
  /** @private */
  #height; 
  /** @private */
  #edges;
  /** @private */
  #formWidth;  /** Will represent the figure's width */
  /** @private */
  #formHeight;  /** Will represent the figure's height */
  /** @private */
  #coordinateX;  /** Will represent the figure's top-left corner coordinate X */
  /** @private */
  #coordinateY;  /** Will represent the figure's top-left corner coordinate Y */

  /**
   * Constructor will be inherited plus will set edges attribute.
   * @param {HTMLElement} passedCanvas Canvas to output graphics.
   * @param {Number} coordinateX top-left corner coordinate X
   * @param {Number} coordinateY top-left corner coordinate Y
   * @param {Number} width figure's width
   * @param {Number} height figure's height
   */
  constructor(passedCanvas, coordinateX, coordinateY, width, height) {
    super(passedCanvas);
    this.#context = passedCanvas.getContext('2d');
    this.#edges = 4;
    this.#coordinateX = coordinateX;
    this.#coordinateY = coordinateY;
    this.#formWidth = width;
    this.#formHeight = height;
  }

  /**
   * This function will draw the geometric figure into the canvas.
   */
  draw() {
    this.#context.beginPath();
    this.#context.rect(this.#coordinateX, this.#coordinateY, 
        this.#formWidth, this.#formHeight);
    this.#context.stroke();
  }

  /**
   * This function will return the area of the given Rectangle.
   * @return {Number} Area of the rectangle.
   */
  getArea() {
    return this.#formHeight * this.#formWidth;
  }

  /**
   * This function will return the perimeter of the given Polygon.
   * @return {Number} Perimeter of the figure.
   */
  computePerimeter() {
    return 2 * this.#formWidth + 2 * this.#formHeight;
  }

};

export {Rectangle};
