/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @author Sebastián Daniel Tamayo Guzmán
* @since 20/04/2021
* @desc Unit testing with Mocha and Chai for Mandelbrot class, which is
*       espected to facilitate its set graphic visualization and the 
*       computation of the canvas.
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P09-Canvas/blob/master/p09_Canvas.md}
*/

import { Mandelbrot } from '../src/assets/js/mandelbrot.js';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

/**
 * Se comprobará la correcta instanciación de objetos de tipo Mandelbrot, asi
 * como la funcionalidad de sus funciones para el cálculo del conjunto.
 */
describe('Mandelbrot class', () => {
  let canvas;
  beforeEach(() => {
    const HTML = '<!DOCTYPE html><canvas id="canvas" width="100" height="100"></canvas>';
    global.document = new JSDOM(HTML).window.document;
    canvas = global.document.getElementById("canvas");
  });
  
  it('Constructor only with canvas as arguments', () => {
    expect(() => new Mandelbrot(canvas)).not.to.throw();
  });

  it('Constructor with canvas and max iterations values', () => {
    expect(() => new Mandelbrot(canvas, 100)).not.to.throw();
  });

  it('Constructor with canvas, max iterations and scaling values', () => {
    expect(() => new Mandelbrot(canvas, 100, -2, 1, -1, 1)).not.to.throw();
  });

  it('Complex (0, 0) belongs to mandelbrot set', () => {
    expect(new Mandelbrot(canvas).belongsToMandelbrot(0, 0, 250))
        .to.deep.equal(250);
  });

  it('belongsToMandelbrot finds non belonging number', () => {
    expect(new Mandelbrot(canvas).belongsToMandelbrot(-1.5, 0.5, 250))
      .to.deep.equal(1);
  });

  it('belongsToMandelbrot finds right iterations number', () => {
    expect(new Mandelbrot(canvas).belongsToMandelbrot(-0.6, 0.5, 1000))
      .to.deep.equal(10);
  });

  it('Drawing method do not crash', () => {
    expect(() => new Mandelbrot(canvas, 10).draw()).not.to.throw();
  });

  it('Area and error computing do not crash', () => {
    expect(() => new Mandelbrot(canvas).computeArea(100)).not.to.throw();
  });

});
