/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @author Sebastián Daniel Tamayo Guzmán
* @since 04/05/2021
* @desc Unit testing with Mocha and Chai for Chess class, which is
*       expected to facilitate the chess board visualization and computation
*       of solutions for 8 queen's problem.
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P11-Ajedrez}
*/

import { Chess } from '../src/chess-web/assets/js/chess.js';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

/**
 * Se comprobará la correcta instanciación de objetos de tipo Chess, asi
 * como el correcto funcionamiento de sus funciones.
 */
describe('Chess class', () => {
  let canvas;
  beforeEach(() => {
    const HTML = '<!DOCTYPE html><canvas id="canvas" width="100" height="100"></canvas>';
    global.document = new JSDOM(HTML).window.document;
    canvas = global.document.getElementById("canvas");
  });

  it('Constructor does not crash', () => {
    expect(() => new Chess(canvas)).not.to.throw();
  });

  it('Constructor computes any solution for eight queens problem', () => {
    expect(new Chess(canvas)
        .getNumberOfSolutions()).not.to.deep.equal(0);
  });

  it('Constructor computes all the 92 solution for eight queens problem', () => {
    expect(new Chess(canvas)
        .getNumberOfSolutions()).to.deep.equal(92);
  });

  it('First solution and its algebraic notation are correct.', () => {
    const SOLUTION = 'Queens are situated at: a8, b4, c1, d3, e6, f2, g7, h5.';
    expect(new Chess(canvas)
      .getAlgebraicNotation(0)).to.deep.equal(SOLUTION);
  });

  it('Second solution and its algebraic notation are correct.', () => {
    const SOLUTION = 'Queens are situated at: a8, b3, c1, d6, e2, f5, g7, h4.';
    expect(new Chess(canvas)
      .getAlgebraicNotation(1)).to.deep.equal(SOLUTION);
  });

  it('Twenty-thrid solution and its algebraic notation are correct.', () => {
    const SOLUTION = 'Queens are situated at: a6, b3, c1, d8, e5, f2, g4, h7.';
    expect(new Chess(canvas)
      .getAlgebraicNotation(22)).to.deep.equal(SOLUTION);
  });

  it('Empty board drawing function does not crash', () => {
    expect(() => new Chess(canvas).emptyBoard()).not.to.throw();
  });

  // it('Begin chess board drawing function does not crash', () => {
  //   expect(() => new Chess(canvas).beginChess()).not.to.throw();
  // });

  // it('8 Queen solution drawing second function does not crash', () => {
  //   expect(() => new Chess(canvas).drawSolution(1)).not.to.throw();
  // });

  // it('8 Queen solution drawing last function does not crash', () => {
  //   expect(() => new Chess(canvas).drawSolution(91)).not.to.throw();
  // });
});