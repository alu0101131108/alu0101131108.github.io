/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Mandelbrot
* @desc ES6 Module to represent the Mandelbrot set in a HTML Canvas. It also
*       makes possible to calculate area and error by the Montecarlo method.
* @since 16/04/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P09-Canvas/blob/master/p09_Canvas.md}
*/

import {ComplexNumber} from './complex-numbers.js'

/**
 * Mandelbrot class, for the computation of its set, its graphic
 * representation on a html canvas and the calculus of its area.
 */
class Mandelbrot {
  /** @private */
  #canvas;
  /** @private */
  #context;
  /** @private */
  #width; 
  /** @private */
  #height; 
  /** @private */
  #imageData;
  /** @private */
  #MAX_ITERATIONS;
  /** @private */
  #scaleXMin;
  /** @private */
  #scaleXMax;  /** Ma */
  /** @private */
  #scaleYMin;
  /** @private */
  #scaleYMax;

  /**
   * Constructor will set canvas related data estructures as atributtes in 
   * order to facilitate access to them.
   * @param {HTMLElement} passedCanvas Canvas to output graphics.
   * @param {Number} maxIterations Maximum number of iterations used.
   * @param {Number} scaleXMin Minimum value for X Axis.
   * @param {Number} scaleXMax Maximum value for X Axis.
   * @param {Number} scaleYMin Minimum value for Y Axis.
   * @param {Number} scaleYMax Maximum value for Y Axis.
   */
  constructor(passedCanvas, maxIterations, 
      scaleXMin, scaleXMax, scaleYMin, scaleYMax) {
    this.#canvas = passedCanvas;
    this.#context = this.#canvas.getContext('2d');
    this.#width = this.#canvas.width;
    this.#height = this.#canvas.height;
    this.#imageData = this.#context
      .getImageData(0, 0, this.#width, this.#height);
    this.#MAX_ITERATIONS = maxIterations ? maxIterations : 255;
    this.#scaleXMin = scaleXMin ? scaleXMin : -2;
    this.#scaleXMax = scaleXMax ? scaleXMax : 1;
    this.#scaleYMin = scaleYMin ? scaleYMin : -1;
    this.#scaleYMax = scaleYMax ? scaleYMax : 1;
    this.#context.font = '20px Arial';
  }

  /**
   * Given the real and imaginary part of a complex number, this function
   * will return the number of iterations needed for it to not belong to
   * the Mandelbrot set. If Iterations exceed maxIterations, function will
   * return maxIterations, which means it does not belong to mandelbrot set.
   * @param {Number} real
   * @param {Number} imaginary
   * @param {Number} maxIterations
   * @return {Number} Iterations needed for the number to belong.
   */
  belongsToMandelbrot(real, imaginary, maxIterations) {
    maxIterations = maxIterations ? maxIterations : this.#MAX_ITERATIONS; 
    let value = new ComplexNumber(real, imaginary);
    const INITIAL_VALUE = value;
    for (let i = 0; i < maxIterations; i++) {
      value = value.mul(value).add(INITIAL_VALUE);
      if (value.abs > 2) return i;
    }
    return maxIterations;
  }

  /**
   * This function will iterate through pixels on canvas and find the
   * corresponding complex number between ranges specified in constructor.
   * Then for each corresponding complex, function belongsToMandelbrot() will
   * determine how many iterations match that number. The last part will be
   * to assign a greyscale color to the pixel depending on the iterations.
   */
  draw() {
    for (let pixelX = 0; pixelX < this.#width; pixelX++) {
      for (let pixelY = 0; pixelY < this.#height; pixelY++) {
        // Map both values from pixel coordinates to complexes in given limits.
        const REAL = this.#scaleXMin + 
            (pixelX / this.#width) * (this.#scaleXMax - this.#scaleXMin);
        const IMAGINARY = this.#scaleYMin + 
            (pixelY / this.#height) * (this.#scaleYMax - this.#scaleYMin);
        const ITERATIONS = this.belongsToMandelbrot(REAL, IMAGINARY);
        const INDEX = 4 * (this.#width * pixelY + pixelX);
        // Map iterations value to range (0 -255).
        const WEIGHT = ITERATIONS * 255 / this.#MAX_ITERATIONS;
        this.#imageData.data[INDEX] = WEIGHT;
        this.#imageData.data[INDEX + 1] = WEIGHT;
        this.#imageData.data[INDEX + 2] = WEIGHT;
        this.#imageData.data[INDEX + 3] = 255;
      }
    }
    this.#context.putImageData(this.#imageData, 0, 0);
  }

  /**
   * This function will compute the Mandelbrot Set area and the error on the
   * calculus. This will be perfomed following the Montecarlo method which
   * consists on displaying a given number of N random complex numbers, in a
   * given range, and then counting how many of them belong to mandelbrot set
   * specifing a maximum iterations value. Then both values can be computed
   * using the following expressions:
   * Area = 2 * 2.5 * 1.125 * Nbelong / N.
   * Error = Area / sqrt(N).
   * Both results are displayed on attribute canvas.
   * @param {Number} randomNumbers 
   * @param {Number} maxIterations 
   */
  computeArea(randomNumbers, maxIterations) {
    maxIterations = maxIterations ? maxIterations : this.#MAX_ITERATIONS; 
    let belongingCount = 0; 
    for (let i = 0; i < randomNumbers; i++) {
      const REAL = Math.random() * 2.5 - 2;
      const IMAGINARY = Math.random() * 1.125;
      if (this.belongsToMandelbrot(REAL, IMAGINARY, maxIterations) ==
          maxIterations) {
        belongingCount++;
      }
    }
    const AREA = 2 * 2.5 * 1.125 * belongingCount / randomNumbers;
    const ERROR = AREA / Math.sqrt(randomNumbers);
    this.#context.fillStyle = 'black';
    this.#context.fillRect(10, this.#height - 100, this.#width / 3.5, 100);
    this.#context.fillStyle = 'red';
    this.#context.fillText('Area: ' + AREA, 10, this.#height - 60);    
    this.#context.fillText('Error: ' + ERROR, 10, this.#height - 10);
  }
};

export {Mandelbrot};
