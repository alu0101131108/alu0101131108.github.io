/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Controller
* @desc ES6 Module that contains the Controller part of a MVC
* app to build a halma like browser game.
* @since 14/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P13-MVC-Halma}
*/

/** 
 * This class will hold all the inner logic needed for a Halma Browser 
 * Game. This is the logic related to rules, movement logic and user input 
 * managing. In order to manage major data structures it will use an instance 
 * of the Model class and for the graphic visualization logic it will use an 
 * instance of the View class. This class will also be in charge of the 
 * communication between Model and View objects. This is a pattern known as
 * Model-View-Controller.
 */
class Controller {

  /** @private */
  #model  /** Model object to manage data related to the game state */
  #view   /** View object used to manage all graphic visualization logic */

  /**
   * First it will set given parameters to the corresponding properties. Then
   * it will call the needed functions to let the game in starting state by
   * using the Model and let the game output its graphic visualization in the
   * browser by using the View. It will also bind actions to the captured events
   * by the View object in order to capture user clicks on the board and resizing
   * the canvas.
   * @param {Object} model Model object to use.
   * @param {Object} view View object to use.
   */
  constructor(model, view) {
    this.#model = model;
    this.#view = view;
    this.#restartGame();
    this.#updateBoard();
    this.#updateCounter();

    // Bind handlers.
    this.#view.bindCanvasClickHandler(this.#handleCanvasClick.bind(this));
    this.#view.bindMouseWheelHandler(this.#updateBoard.bind(this));
  }

  /** @private */
  /**
   * This function will reset the game, setting the initial chips at their
   * initial position and resetting the counter.
   */
  #restartGame() {
    const CHIPS_SQRT = Math.trunc(Math.sqrt(this.#model.getInitialChips()));
    const CELLS_SQRT = Math.trunc(Math.sqrt(this.#model.getBoardCells()));
    this.#model.setChaining(false);
    this.#model.resetCounter();
    this.#model.resetBoard();
    for (let i = 1; i <= CHIPS_SQRT; i++) {
      for (let column = 0; column < CHIPS_SQRT; column++) {
        this.#model.addChip(CELLS_SQRT - i, column);
      }
    }
  }

  /** @private */
  /**
   * This function will be used for telling the view that the board has
   * changed and then its graphic representation needs to be updated.
   */
  #updateBoard() {
    const BOARD = this.#model.getBoard();
    this.#view.displayBoard(BOARD);
  }

  /** @private */
  /**
   * This function will be used for telling the view that the counter has
   * changed and then its graphic representation needs to be updated.
   */
  #updateCounter() {
    const COUNTER = this.#model.getCounter();
    this.#view.displayCounter(COUNTER)
  }

  /** @private */
  /**
   * This function will be the handler binded to the onclick event at the canvas
   * from the view object. It will recieve two coordinates relative to the canvas
   * and it will map them to indexes is the board. Then it will decide what needs
   * to be done depending on where the click was registered. After the click is
   * processed, view is told to update its graphic elements.
   * @param {Number} clickX Horizontal index for the click event.
   * @param {Number} clickY Vertical index for the click event.
   */
  #handleCanvasClick(clickX, clickY) {
    // Map from click event coordinates to board indexes.
    const CELLS_SQRT = Math.trunc(Math.sqrt(this.#model.getBoardCells()));
    const DISPLAY_WIDTH = this.#view.getCanvasWidth();
    const DISPLAY_HEIGHT = this.#view.getCanvasHeight();
    const ROW = Math.trunc(clickY / DISPLAY_HEIGHT * CELLS_SQRT);
    const COLUMN = Math.trunc(clickX / DISPLAY_WIDTH * CELLS_SQRT);

    // Clicked on a chip.
    if (this.#model.isChipIn(ROW, COLUMN)) {
      this.#model.endAllChipsMoving();
      this.#model.setChipMoving(ROW, COLUMN);
      this.#model.setChaining(false);

      // Clicked on an empty cell and there is a current moving chip.
    } else if (this.#model.getMovingChip()) {
      this.#attemptMoveChip(ROW, COLUMN);
    }

    this.#updateBoard();
    this.#updateCounter();
  }

  /** @private */
  /**
   * Once the canvas click handler has detected the user is attempting to move a
   * chip, this function will decide which type of move is being attempted in
   * order to execute it if its valid. It will also implement the logic to 
   * increment the counter if the move is not a chained move.
   * @param {Number} newRow Row index of the attempted move. 
   * @param {Number} newColumn Column index of the attempted move.
   */
  #attemptMoveChip(newRow, newColumn) {
    const MOVING_CHIP = this.#model.getMovingChip();
    if (!MOVING_CHIP) {
      throw new Error('Controller::attemptModeChip() no current moving chip.');
    }
    const ROW = MOVING_CHIP.getRow();
    const COLUMN = MOVING_CHIP.getColumn();

    // Regular moves.
    if (this.#validRegularMove(ROW, COLUMN, newRow, newColumn)) {
      this.#model.incrementCounter();
      this.#model.moveChip(ROW, COLUMN, newRow, newColumn);
      this.#model.endAllChipsMoving();
      this.#model.setChaining(false);

      // Jump moves.
    } else if (this.#validJumpMove(ROW, COLUMN, newRow, newColumn)) {
      if (!this.#model.getChaining()) {
        this.#model.incrementCounter();
      }
      this.#model.moveChip(ROW, COLUMN, newRow, newColumn);
      this.#model.setChaining(true);

      // Invalid moves.
    } else {
      this.#model.endAllChipsMoving();
      this.#model.setChaining(false);
    }
  }
  
  /** @private */
  /**
   * This function will implement the logic needed to decide whether a
   * regular move is valid or not. The move will be valid if the final
   * position is a neighbour cell of the original position.
   * @param {Number} row Row index of the original position.
   * @param {Number} column Column index of the original position.
   * @param {Number} newRow Row index of the jumping position.
   * @param {Number} newColumn Column index of the jumping position.
   * @return {Boolean}
   */
  #validRegularMove(row, column, newRow, newColumn) {
    const ABS_ROW_OFFSET = Math.abs(row - newRow);
    const ABS_COLUMN_OFFSET = Math.abs(column - newColumn);
    // Obliqe, vertical and horizontal.
    return (ABS_ROW_OFFSET === 1 && ABS_COLUMN_OFFSET === 1) ||
        (ABS_ROW_OFFSET === 0 && ABS_COLUMN_OFFSET === 1) ||
        (ABS_ROW_OFFSET === 1 && ABS_COLUMN_OFFSET === 0);

  }

  /** @private */
  /**
   * This function will implement the logic needed to decide whether a
   * jump move is valid or not. A chip needs another one in a neighbour
   * cell to jump over it.
   * @param {Number} row Row index of the original position.
   * @param {Number} column Column index of the original position.
   * @param {Number} newRow Row index of the jumping position.
   * @param {Number} newColumn Column index of the jumping position.
   * @return {Boolean}
   */
  #validJumpMove(row, column, newRow, newColumn) {
    const ROW_OFFSET = newRow - row;
    const COLUMN_OFFSET = newColumn - column;
    const ABS_ROW_OFFSET = Math.abs(ROW_OFFSET);
    const ABS_COLUMN_OFFSET = Math.abs(COLUMN_OFFSET);
    const JUMPABLE_ROW = row + ROW_OFFSET / 2;
    const JUMPABLE_COLUMN = column + COLUMN_OFFSET / 2;

    // Oblique, vertical and horizontal.
    const ALLOWED_DISTANCE = 
        (ABS_ROW_OFFSET === 2 && ABS_COLUMN_OFFSET === 2) ||
        (ABS_ROW_OFFSET === 0 && ABS_COLUMN_OFFSET === 2) ||
        (ABS_ROW_OFFSET === 2 && ABS_COLUMN_OFFSET === 0);

    return ALLOWED_DISTANCE && this.#model.isChipIn(JUMPABLE_ROW, JUMPABLE_COLUMN);
  }

}

export { Controller };