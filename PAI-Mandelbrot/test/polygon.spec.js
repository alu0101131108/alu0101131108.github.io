/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @author Sebastián Daniel Tamayo Guzmán
* @since 20/04/2021
* @desc Unit testing with Mocha and Chai for Polygon class, which is
*       expected to be an abstract class that will be overriden in order
*       to draw figures into a HTML canvas.
*/

import { Polygon } from '../src/assets/js/polygon.js';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

/**
 * This tests will check that this is an Abstract Class and then,
 * all its methods, ment to be overriden, invoqued from the base 
 * class return an error.
 */
describe('Polygon class', () => {
  let canvas;
  beforeEach(() => {
    const HTML = '<!DOCTYPE html><canvas id="canvas" width="100" height="100"></canvas>';
    global.document = new JSDOM(HTML).window.document;
    canvas = global.document.getElementById("canvas");
  });
  
  it('Constructor of this class will give an error', () => {
    expect(() => new Polygon(canvas).draw()).to.throw();
  });

  it('Draw method of this class will give an error', () => {
    expect(() => new Polygon(canvas).getArea()).to.throw();
  });

  it('Perimeter method of this class will give an error', () => {
    expect(() => new Polygon(canvas).computePerimeter()).to.throw();
  });

  it('getNumberOfEdges method of this class will give an error', () => {
    expect(() => new Polygon(canvas).getNumberOfEdges()).to.throw();
  });
});
