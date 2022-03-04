/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module HalmaMvc
* @desc ES6 Module that contains a class for constructing a Halma
* like browser game following Model View Controller Pattern.
* @since 14/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P13-MVC-Halma}
*/

import { Controller } from './controller.js';
import { View } from './view.js';
import { Model } from './model.js';

/**
 * This class will be a simbolic container of the three main elements that
 * are needed to create a Halma Browser Game following the Model Control
 * View pattern. The object only needs to be instantiated in order to initiate
 * the complete application.
 */
class HalmaMvc {

  /**
   * It will create the three main components: Model, view and controller.
   */
  constructor() {
    const MODEL = this.#createModel();
    const VIEW = this.#createView();
    const APP = new Controller(MODEL, VIEW);
  }
  
  /**
   * This function will create the model object setting the specific values
   * to accomplish the desired app inner data structures.
   * @return {Object} Model
   */
  #createModel() {
    const BOARD_CELLS = 81;
    const INITIAL_CHIPS = 9;
    const MODEL = new Model(BOARD_CELLS, INITIAL_CHIPS);
    return MODEL;
  }

  /**
   * This function will create the view object setting the specific values
   * to accomplish the desired graphic interface for the app.
   * @return {Object} View
   */
  #createView() {
    const TITLE = 'Halma';
    const HTML_IDS = {
      root: 'root',
      title: 'title',
      iconButtons: 'icon-buttons',
      counter: 'counter'
    };
    const COLOR_PALLETE = {
      background: 'white',
      cell: 'grey',
      chip: 'black'
    };
    const CANVAS_WIDTH = 500;
    const CANVAS_HEIGHT = 500;
    const VIEW = new View(TITLE, HTML_IDS, COLOR_PALLETE, CANVAS_WIDTH, CANVAS_HEIGHT);
    return VIEW;
  }

}

export { HalmaMvc };
