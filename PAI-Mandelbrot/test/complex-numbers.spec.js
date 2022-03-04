/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @author Sebastián Daniel Tamayo Guzmán
* @since 15/04/2021
* @desc Unit testing with Mocha and Chai for Complex Number Class, which is
*       espected to support representation and mathematical operations.
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P09-Canvas/blob/master/p09_Canvas.md}
*/

import { ComplexNumber } from '../src/assets/js/complex-numbers.js';
import { expect } from 'chai';

/**
 * Se comprobará la correcta instanciación de objetos de tipo Complex, así
 * como el manejo de errores en su constructor y sus métodos para operar
 * entre objetos de la clase.
 */
describe('ComplexNumber class', () => {
  let testComplex;
  beforeEach(() => {
    testComplex = new ComplexNumber(10, -3);
  });

  it('Error when any parameter is not a number', () => {
    expect(() => new ComplexNumber(-2, '11')).to.throw();
  });

  it('Pure real is valid', () => {
    expect(() => new ComplexNumber(-5)).not.to.throw();
  });

  it('Default paremeters are valid', () => {
    expect(() => new ComplexNumber()).not.to.throw();
  });

  it('equals method', () => {
    expect(testComplex.equals(new ComplexNumber(10, -3))).to.deep.equal(true);
  });

  it('Default value is zero', () => {
    expect(new ComplexNumber().equals(new ComplexNumber(0, 0))).to.deep.equal(true);
  });

  it('add method', () => {
    const OPERATED = testComplex.add(new ComplexNumber(-10, -2));
    expect(OPERATED.equals(new ComplexNumber(0, -5))).to.deep.equal(true);
  });

  it('substract method', () => {
    const OPERATED = testComplex.sub(new ComplexNumber(0, -3));
    expect(OPERATED.equals(new ComplexNumber(10, 0))).to.deep.equal(true);
  });

  it('conjugate method', () => {
    const CONJUGATED = testComplex.conj;
    expect(CONJUGATED.equals(new ComplexNumber(10, 3))).to.deep.equal(true);
  });

  it('multiply method', () => {
    const OPERATED = testComplex.mul(new ComplexNumber(-2, -13));
    expect(OPERATED.equals(new ComplexNumber(-59, -124))).to.deep.equal(true);
  });

  it('divide method', () => {
    const OPERATED = testComplex.div(new ComplexNumber(-2, -4));
    expect(OPERATED.equals(new ComplexNumber(-0.4, 2.3))).to.deep.equal(true);
  });

  it('absolute value method', () => {
    testComplex = new ComplexNumber(-4, 3);
    expect(testComplex.abs).to.deep.equal(5);
  });

  it('exponential method', () => {
    testComplex = new ComplexNumber(0, 0);
    expect(testComplex.exp.abs).to.deep.equal(1);
  });

});
