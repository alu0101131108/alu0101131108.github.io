/**
* Universidad: Universidad de La Laguna
* Titulación:  Grado en Ingeniaría Informática, 3º Curso
* Asignatura:  Programación de Aplicaciones Interactivas
* @module Mandelbrot
* @desc Basic static web page server.
* @since 16/04/2021
* @author Sebastián Daniel Tamayo Guzmán
* @see [Guión]{@link https://github.com/ULL-ESIT-INF-PAI-2020-2021/PAI-P11-Ajedrez}
*/

'use strict';

const EXPRESS = require('express');
const PATH = require('path');
const APP = EXPRESS();

// Set the port
APP.set('port', 8080);

// Tell express which folder contains our static assets
APP.use(EXPRESS.static(PATH.join(__dirname, './assets')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function() {
  console.log('The server is running on http://10.6.129.53:' + APP.get('port'));
});
