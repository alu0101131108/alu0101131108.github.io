# Práctica 13. Modelo Vista Controlador. Halma
### Factor de ponderación: 10

### Objetivos
Los objetivos de esta práctica son:

* Practicar el diseño de una aplicación de acuerdo al patrón MVC.
* Poner en práctica metodologías y conceptos de Programación Orientada a Objetos.
* Poner en práctica conceptos de Programación Orientada a Eventos en JavaScript.
* Poner en práctica conceptos de Programación Gráfica en JavaScript usando la API Canvas.
* Practicar el uso de elementos HTML básicos.
* Practicar el uso de algunas propiedades básicas de CSS para dotar de estilo a una página web simple.

### Rúbrica de evaluacion del ejercicio
Se señalan a continuación los aspectos más relevantes (la lista no es exhaustiva)
que se tendrán en cuenta a la hora de evaluar esta práctica:

* Se valorará una correcta implementación del patrón MVC y la conformidad a los principios de la OOP.
* El programa debe ajustarse al paradigma de Orientación a Objetos.
* El comportamiento del programa debe ajustarse a lo solicitado en este enunciado.
* Deben usarse estructuras de datos adecuadas para representar los diferentes elementos que intervienen en el problema.
* Capacidad del programador(a) de introducir cambios en el programa desarrollado.
* Se comprobará que el código que el alumnado escribe se adhiere a las reglas de la 
  [Guía de Estilo](https://google.github.io/styleguide/jsguide.html).
* El código ha de estar documentado con [JSDoc](https://jsdoc.app/). 
  Haga que la documentación del programa generada con JSDoc esté disponible a través de una web alojada en su máquina IaaS de la asignatura.
* El alumnado ha de acreditar su capacidad para configurar y ejecutar 
  [ESLint](https://eslint.org/)
  en sus programas.
* El alumnado ha de acreditar que sabe depurar sus programas usando Visual Studio Code.
* Se comprobarán los tests unitarios que el alumnado ha desarrollado para todos sus códigos usando Mocha y Chai, así como
  su capacidad para ejecutar esos tests unitarios desde la interfaz de VSC. 
  Todo el código de los tests que realice para desarrollar la aplicación estarán ubicados en el directorio
  `test` de proyecto.
* Se comprobará el cubrimiento de código que se consigue con los tests usando la herramienta 
  [CodeCov](https://about.codecov.io/)
  y el informe que la misma genera a través de una web.
* Todo el código estará ubicado en el directorio `src` del proyecto. Use subdirectorios de éste si le resulta
  conveniente.

### El patrón Modelo Vista Controlador
El 
[modelo-vista-controlador](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
(MVC) es un patrón de diseño arquitectónico habitualmente utilizado para el desarrollo de interfaces de usuario 
que divide la lógica de la aplicación en tres elementos relacionados. 
Esta división se realiza para separar la representación interna de la información (modelo) 
de las formas en que se presenta (vista) y se acepta la información del usuario (contolador).
Este patrón se ha utilizado tradicionalmente para interfaces gráficas de usuario (GUIs) de escritorio, 
y se ha popularizado asimismo para el diseño de aplicaciones web.

Es fácil encontrar en la web información sobre el patrón MVC, así como ejemplos de implementación del
mismo en diferentes lenguajes.
Los siguientes son elementos que puede utilizar para iniciarse en el estudio del patrón MVC:
* [Estas transparencias](https://campusingenieriaytecnologia.ull.es/pluginfile.php/362286/mod_resource/content/1/FAlmeida-Transparencias-MVC2020.pdf)
del profesor F. Almeida pueden ser un buen punto de toma de contacto con MVC.
* En [esta otra página](https://www.roseindia.net/tutorial/java/jdbc/javamvcdesignpattern.html)
puede hallar otra explicación detallada del modelo con una imagen que muestra el papel y las relaciones entre
los componentes del mismo.
* El directorio `MVC-ejemplo-java` de este proyecto contiene una aplicación java para un conversor de monedas
que sigue el patrón MVC.
* Por último, en el artículo
[Build a Simple MVC App From Scratch in JavaScript](https://www.taniarascia.com/javascript-mvc-todo-app/)
se explica con detalle la implementación de una aplicación (lista de tareas) siguiendo el patrón MVC.
El código de la aplicación utilizando clases ES6 de JS está disponible a través de los enlaces del artículo.

### El juego Halma
Halma es un antiguo juego de mesa del cual existen muchas variantes.
La aplicación que se propone crear es una versión para jugar en solitario con 9 piezas en un tablero de 9x9. 
Al comienzo del juego, las piezas se sitúan formando un cuadrado de 3x3 en la esquina inferior izquierda del tablero. 
El objetivo del juego es mover todas las piezas para que formen un cuadrado de 3x3 en la esquina superior derecha 
del tablero, en el menor número de movimientos.

En 
[esta página](https://diveinto.html5doctor.com/canvas.html#halma)
puede consultar las reglas del juego y dispone asimismo de 
[otra página](https://diveinto.html5doctor.com/examples/canvas-halma.html)
en la que puede jugar interactivamente.
El código fuente de la aplicación está
[también disponible](https://diveinto.html5doctor.com/examples/halma.js).

En esta práctica se propone desarrollar una aplicación web `halma.js`.
La aplicación se diseñará utilizando clases ES6 que modelen el juego e implementen el patrón MVC.
Antes de proceder al desarrollo, tómese el tiempo necesario para identificar objetos, clases, métodos y
relaciones entre estas entidades.

### Interfaz gráfica del programa
Desarrolle una página `einstein-albert-halma.html` para alojar el juego.
La página debiera imitar en todo lo posible el diseño de la página de 
[tabletopia](https://tabletopia.com/playground/players/demo2732384/aiafy3?showAuthDlg=1)
para el juego de Halma (que usa un tablero diferente del que aquí se propone).
Del mismo modo que en la 
[página de referencia de Halma](https://diveinto.html5doctor.com/examples/canvas-halma.html)
su página debiera mostrar en todo momento el número de movimientos que se han realizado.

### Presentación de resultados 
La visualización de la ejecución del programa se realizará a través de una página web alojada
en la máquina IaaS-ULL de la asignatura y cuya URL tendrá la forma:

`http://10.6.129.123:8080/einstein-albert-halma.html` [1]

en la que se incustará un canvas para el juego.
Sustituya *Albert Einstein* por su nombre y apellido en la URL de su página.

Diseñe asimismo otra página HTML simple 

`http://10.6.129.123:8080/index.html` [2]

que sirva de "página índice" para los ejercicios de la sesión de evaluación de la práctica.
La página [1] será uno de los enlaces de [2] y a su vez [1] tendrá un enlace "Home" que apunte a [2].
Enlace también en la página índice [2] las páginas que contienen los informes de documentación y de
cubrimiento de código de su proyecto.

### Presentación de resultados de todas sus prácticas
Esta es la última práctica de la asignatura en el presente curso.
Al efecto de tener todas sus prácticas centralizadas en un único repositorio, organice todas las prácticas que
ha realizado en la asignatura (las haya evaluado o no) en un único proyecto que las incluya todas.
Organice convenientemente el código y recursos de cada práctica en directorios diferenciados dentro del
proyecto.
Consiga que todas aquellas prácticas que hayan consistido en el desarrollo de una aplicación web sean
accesibles a través de una web `prácticas-PAI-2020-2021.html` accesible desde una URL pública en su máquina IaaS de la
asignatura.
