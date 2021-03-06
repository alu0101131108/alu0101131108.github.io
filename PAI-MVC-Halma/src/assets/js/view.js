/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module View
* @desc ES6 Module that contains the View part of a MVC
* app to build a halma like browser game.
* @since 14/05/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P13-MVC-Halma}
*/

/**
 * This class will contain all the code related to the graphic representation 
 * of a Halma game in a browser by mainly using a canvas and setting some basic
 * HTML Elements as the title or control buttons. 
 */
class View {

  /** @private */
  #counter  /** HTML Element that will show the moves counter */
  #canvas   /** HTML Canvas where the board and main graphics will be drawn */
  #colors   /** Dictionary of the color pallete used for the game */
  #rootDiv  /** Root container where all HTML elements will be located */

  /**
   * It will set parameters to corresponding properties. It will also create
   * required HTML Elements and will setup button icons inside their
   * corresponding containers.
   * @param {String} title Text that will appear at the top of the web page.
   * @param {Object} htmlIds Dictionary with id's for web HTML elements.
   * @param {Object} colors Dictionary with color values for the game.
   * @param {Number} canvasWidth Initial width in pixels for main canvas.
   * @param {Number} canvasHeight Initial height in pixels for main canvas.
   */
  constructor(title, htmlIds, colors, canvasWidth, canvasHeight) {
    this.#colors = colors;
    this.#rootDiv = document.getElementById(htmlIds['root']);
    this.#createText('H1', title, htmlIds['title'], this.#rootDiv);
    this.#canvas = this.#createCanvas(canvasWidth, canvasHeight);
    this.#counter = this.#createText('H2', '', htmlIds['counter'], this.#rootDiv);
    this.#setupButtons(htmlIds['iconButtons']);
  }

  /** @private */
  /**
   * 
   * This function will create and return the main HTML Canvas and 
   * also append it as child of the root container.
   * @param {Number} width Number of horizontal pixels
   * @param {Number} height Number of vertical pixels
   * @return {HTMLElement} 
   */
  #createCanvas(width, height) {
    const CANVAS = document.createElement('canvas');
    CANVAS.id = 'main-canvas';
    CANVAS.width = width;
    CANVAS.height = height;
    this.#rootDiv.appendChild(CANVAS);
    return CANVAS;
  }
  
  /** @private */
  /**
   * This function will facilitate the creation of text HTML Elements
   * with the given parameters.
   * @param {String} type Type specifier for text HTML element.
   * @param {String} content Content of the text HTML element.
   * @param {String} id Id for the text HTML element.
   * @param {HTMLElement} parent Container where text element will be located.
   * @return {HTMLElement}
   */
  #createText(type, content, id, parent) {
    const TEXT_ELEMENT = document.createElement(type);
    TEXT_ELEMENT.id = id;
    TEXT_ELEMENT.textContent = content;
    parent.appendChild(TEXT_ELEMENT);
    return TEXT_ELEMENT;
  }

  /** @private */
  /**
   * This function will facilitate the creation of a Div HTML Element.
   * @param {String} id Id for the created Div.
   * @param {HTMLElement} parent Container where Div will be located.
   * @return {HTMLElement}
   */
  #createDiv(id, parent) {
    const DIV = document.createElement('div');
    DIV.id = id;
    parent.appendChild(DIV);
    return DIV;
  }

  /** @private */
  /**
   * This function will facilitate the creation of an HTML image contained
   * in a HTML Linking container, which also is inside a Div element with
   * the specified parameters. It will act as if it was a button that redirect
   * the user to the specified reference.
   * @param {HTMLElement} parent HTML Container to locate the link button.
   * @param {String} reference Link to be redirected when clicking the image.
   * @param {String} source Path location of the image.
   * @param {Number} size Lateral size of the image to be displayed.
   * @return {HTMLElement}
   */
  #createLinkButton(parent, reference, source, size) {
    // Global container.
    const DIV = this.#createDiv(undefined, parent);
    DIV.style.padding = '10px';
    // Reference container.
    const LINK = document.createElement('a');
    LINK.href = reference;
    DIV.appendChild(LINK);
    // Image element.
    const IMAGE = document.createElement('img');
    IMAGE.src = source;
    IMAGE.width = size;
    IMAGE.height = size;
    LINK.appendChild(IMAGE);

    return DIV;
  }

  /** @private */
  /**
   * This function will setup three icons that will act as buttons. First
   * will lead back to the index page, second will lead to an information 
   * about the game page and third will redirect to the current page in order
   * to reset the web.
   * @param {String} id Id property for the generated buttons container.
   */
  #setupButtons(id) {
    const BUTTONS_CONTAINER = this.#createDiv(id, this.#rootDiv);

    const RESET_BUTTON = this.#createLinkButton(this.#rootDiv, 
        './tamayo-sebastian-halma.html', './images/restart-icon.png', '70');
    const HELP_BUTTON = this.#createLinkButton(this.#rootDiv, 
        './help.html', './images/help-icon.png', '70');
    const HOME_BUTTON = this.#createLinkButton(this.#rootDiv, 
        '/index.html', './images/home-icon.png', '70');
    const DOCS_BUTTON = this.#createLinkButton(this.#rootDiv, 
        './docs/index.html', './images/docs-icon.png', '70');

    BUTTONS_CONTAINER.appendChild(RESET_BUTTON);
    BUTTONS_CONTAINER.appendChild(HELP_BUTTON);
    BUTTONS_CONTAINER.appendChild(DOCS_BUTTON);
    BUTTONS_CONTAINER.appendChild(HOME_BUTTON);

    this.#rootDiv.appendChild(BUTTONS_CONTAINER);
  }

  /**
   * Getter for the width property of the canvas attribute.
   * @return {Number}
   */
  getCanvasWidth() {
    return this.#canvas.width;
  }

  /**
   * Getter for the height property of the canvas attribute.
   * @return {Number}
   */
  getCanvasHeight() {
    return this.#canvas.height;
  }

  /**
   * This function will be in charge of drawing the board and its chips
   * with their corresponding states into the main canvas.
   * @param {Array} board Matrix of chips with moving states.
   */
  displayBoard(board) {
    const CONTEXT = this.#canvas.getContext('2d');
    const ROWS = board.length;
    const CELL_HEIGHT = this.#canvas.height / ROWS;
    const COLUMNS = board[0].length;
    const CELL_WIDTH = this.#canvas.width / COLUMNS;
    const CHIP_RADIUS = Math.min(CELL_HEIGHT, CELL_WIDTH) * 0.4;
    const CHIP_X_OFFSET = CELL_WIDTH / 2;
    const CHIP_Y_OFFSET = CELL_HEIGHT / 2;

    // Draw background.
    CONTEXT.fillStyle = this.#colors['background'];
    CONTEXT.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    // Draw board related graphics.
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        // Draw cell lines.
        const CELL_X = column * CELL_WIDTH;
        const CELL_Y = row * CELL_HEIGHT;
        CONTEXT.strokeStyle = this.#colors['cell'];
        CONTEXT.strokeRect(CELL_X, CELL_Y, CELL_WIDTH, CELL_HEIGHT);
        // Draw chips, moving or not.
        if (board[row][column] !== false) {
          CONTEXT.beginPath();
          CONTEXT.arc(CELL_X + CHIP_X_OFFSET, CELL_Y + CHIP_Y_OFFSET,
              CHIP_RADIUS, 0, 2 * Math.PI);
          CONTEXT.fillStyle = this.#colors['chip'];
          CONTEXT.strokeStyle = this.#colors['chip'];
          board[row][column].getMoving() ? CONTEXT.fill() : CONTEXT.stroke();
        }
      }
    }
  }

  /**
   * This function will be in charge to set the content of the
   * counter property.
   * @param {String} counter Number of moves to output.  
   */
  displayCounter(counter) {
    this.#counter.textContent = 'Moves: ' + counter;
  }

  /**
   * This function will bind a given function as parameter to the
   * onclick event of the HTML Canvas. It will also translate the
   * window coordinates generated by the onclick event to canvas
   * relative coordinates to pass them as parameters to the handler
   * function.
   * @param {Function} handler Handler function.
   */
  bindCanvasClickHandler(handler) {
    this.#canvas.addEventListener('click', (event) => {
      // Map from window coordinates to canvas coordinates.
      const CLICK_X = event.clientX - this.#canvas.offsetLeft;
      const CLICK_Y = event.clientY - this.#canvas.offsetTop;
      handler(CLICK_X, CLICK_Y);
    });
  }

  /**
   * This function will bind a given function as parameter to the
   * onwheel event of the root HTML container. It will first resize
   * the canvas with respect to the event properties to then execute
   * the handler which is supposed to be the controller instruction
   * of redraw to complete the resizing of the canvas.
   * @param {Function} handler Handler function.
   */
  bindMouseWheelHandler(handler) {
    this.#rootDiv.addEventListener('wheel', (event) => {
      const RATIO = 10;
      if (event.deltaY > 0 && this.#canvas.width > 300) {
        this.#canvas.width -= RATIO;
        this.#canvas.height -= RATIO;
      } else if (event.deltaY < 0 && this.#canvas.width < 700) {
        this.#canvas.width += RATIO;
        this.#canvas.height += RATIO;
      }
      handler();
    });
  }

}

export { View };