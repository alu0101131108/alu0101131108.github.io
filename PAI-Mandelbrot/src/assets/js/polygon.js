/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Mandelbrot
* @desc ES6 Module to represent Polygons in a HTML Canvas.
* @since 21/04/2021
* @author Sebastián Daniel Tamayo Guzmán
*/

/**
 * Polygon abstract class, base clase for a set of classes that will extend this one
 * in order to outcast them in a HTML canvas.
 */
class Polygon {
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
      if (this.constructor == Polygon) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
  
    /**
     * This function will be overriden in order to achieve drawing
     * diverse polygons.
     */
    draw() {
      throw new Error("Method 'draw()' must be implemented.");
    }

    /**
     * This function will be overriden in order to return the number
     * of segments of the given Polygon.
     */
    getNumberOfEdges() {
      if (this.constructor == Polygon) {
        throw new Error("Method 'getNumberOfEdges()' must be implemented.");
      }
      return this.#edges;
    }

    /**
     * This function will be overriden in order to return the area
     * of the given Polygon.
     */
    getArea() {
      throw new Error("Method 'getArea()' must be implemented.");
    }

    /**
     * This function will be overriden in order to return the perimeter
     * of the given Polygon.
     */
    computePerimeter() {
      throw new Error("Method 'computePerimeter()' must be implemented.");
    }
  
  };
  
  export {Polygon};
  