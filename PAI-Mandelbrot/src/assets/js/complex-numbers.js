/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module ComplexNumber
* @desc ES6 Module that contains a class for complex numbers representation
*       and operations.
* @since 07/04/2021
* @author Sebastián Daniel Tamayo Guzmán
*/

/**
 * Class for representing and operating with complex numbers.
 */
class ComplexNumber { 

  /** @private */
  #real;
  /** @private */
  #imaginary;

  /**
   * Will set attributes and check if given arguments are valid.
   * @param {Number} real
   * @param {Number} imaginary
   */
  constructor(real, imaginary) {
    if ((real && typeof (real) !== 'number') ||
      (imaginary && typeof (imaginary) !== 'number')) {
      throw new TypeError('Invalid parameters, they must be numbers.');
    }
    this.#real = real ? real : 0;
    this.#imaginary = imaginary ? imaginary : 0;
  }

  /**
   * Getter for real property.
   * @return {Number}
   */
  get real() {
    return this.#real;
  }

  /**
   * Getter for imaginary property.
   * @return {Number}
   */
  get imag() {
    return this.#imaginary;
  }

  /**
   * Setter for real property.
   * @param {Number} real
   */
  setReal(real) {
    this.#real = real;
  }

  /**
   * Setter for imaginary property.
   * @param {Number} imaginary
   */
  setImaginary(imaginary) {
    this.#imaginary = imaginary;
  }

  /**
   * Adds two complex numbers.
   * @param {ComplexNumber} other
   * @return {ComplexNumber}
   */
  add(other) {
    return new ComplexNumber(this.#real + other.real, this.#imaginary + other.imag);
  }

  /**
   * Substracts two complex numbers.
   * @param {Complex} other
   * @return {ComplexNumber}
   */
  sub(other) {
    return new ComplexNumber(this.#real - other.real, this.#imaginary - other.imag);
  }

  /**
   * Multiplies two complex numbers.
   * @param {Complex} other
   * @return {ComplexNumber}
   */
  mul(other) {
    const REAL_A = this.#real;
    const IMAGINARY_A = this.#imaginary;
    const REAL_B = other.real;
    const IMAGINARY_B = other.imag;
    const NEW_REAL = (REAL_A * REAL_B) - (IMAGINARY_A * IMAGINARY_B);
    const NEW_IMAG = (REAL_A * IMAGINARY_B) + (IMAGINARY_A * REAL_B);
    return new ComplexNumber(NEW_REAL, NEW_IMAG);
  }

  /**
   * Divides two complex numbers.
   * @param {Complex} other
   * @return {ComplexNumber}
   */
  div(other) {
    const REAL_A = this.#real;
    const IMAGINARY_A = this.#imaginary;
    const REAL_B = other.real;
    const IMAGINARY_B = other.imag;
    const DENOM = IMAGINARY_B * IMAGINARY_B + REAL_B * REAL_B;
    const NEW_REAL = (REAL_A * REAL_B + IMAGINARY_A * IMAGINARY_B) / DENOM;
    const NEW_IMAG = (REAL_B * IMAGINARY_A - REAL_A * IMAGINARY_B) / DENOM;
    return new ComplexNumber(NEW_REAL, NEW_IMAG);
  }

  /**
   * Returns absolute value asociated with the calling complex number.
   * @return {Number}
   */
  get abs() {
    return Math.hypot(this.#real, this.#imaginary);
  }

  /**
   * Returns the conjugate of the calling complex number.
   * @return {Complex}
   */
  get conj() {
    return new ComplexNumber(this.#real, this.#imaginary * -1);
  }

  /**
   * Returns complex numbers resultant from the expression e ^(calling complex).
   * @return {Complex}
   */
  get exp() { 
    return new ComplexNumber(Math.pow(Math.E, this.#real), 0)
        .mul(new ComplexNumber(Math.cos(this.#imaginary), Math.sin(this.#imaginary)));
  }

  /**
   * Returns true if both complex share real and imaginary properties.
   * @return {Boolean}
   */
  equals(other) {
    return (other.real === this.real && other.imag === this.imag);
  }
}

export {ComplexNumber};
