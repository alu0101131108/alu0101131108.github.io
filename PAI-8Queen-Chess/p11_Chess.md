# Práctica 11. Programación Gráfica y Orientada a Eventos. HTML. Canvas. Ajedrez
### Factor de ponderación: 9

### Objetivos
Los objetivos de esta práctica son:

* Poner en práctica conceptos de Programación Orientada a Eventos en JavaScript.
* Poner en práctica metodologías y conceptos de Programación Orientada a Objetos.
* Poner en práctica conceptos de Programación Gráfica en JavaScript usando la API Canvas.
* Practicar el uso de elementos HTML básicos.
* Practicar el uso de algunas propiedades básicas de CSS para dotar de estilo a una página web simple.
* Poner en práctica metodologías y conceptos de Programación Orientada a Objetos en JavaScript.
* Profundizar en el uso de pruebas de software (testing) utilizando Mocha y Chai.

### Rúbrica de evaluacion del ejercicio
Se señalan a continuación los aspectos más relevantes (la lista no es exhaustiva)
que se tendrán en cuenta a la hora de evaluar esta práctica:

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
* El programa debe ajustarse al paradigma de Orientación a Objetos.
* Todo el código estará ubicado en el directorio `src` del proyecto. Use subdirectorios de éste si le resulta
  conveniente.

### El problema de las 8 reinas
En esta práctica se realizarán ejercicios relacionados con el juego del Ajedrez.
Consulte
[Wikipedia](https://es.wikipedia.org/wiki/Ajedrez)
para un conocimiento básico del juego, en caso de que no lo conozca.

El problema de las 
[8 reinas](https://en.wikipedia.org/wiki/Eight_queens_puzzle) 
es un pasatiempo famoso consistente en colocar ocho reinas en un tablero de ajedrez de modo que no se amenacen.

Comience por resolver el problema 
[Queen Attack](https://exercism.io/my/solutions/0bd86f956c3a45fca46d03fd1215ecc7)
del *track* de JavaScript de Exercism.

Si revisa los tests del ejercicio observará que la solución requiere que cree una clase `QueenAttack`
cuyo constructor toma como parámetros las posiciones de un par de reinas de la forma:

`const queens = new QueenAttack({ white: [2, 4], black: [6, 6] });`

### La clase *Chess*
Se propone tomar como punto de partida el programa que resuelve el problema de
las 8 reinas para añadirle una interfaz gráfica basada en HTML y CSS y poder ejecutar el programa a través de esa interfaz web.

Se propone desarrollar una clase `Chess` 
que posibilite la visualización en una página web de un tablero de ajedrez con sus figuras.
La clase ha de encapsularse en un módulo ES6 `chess.js`.

Tenga en cuenta las siguientes especificaciones a la hora de diseñar su programa:

* Comience por adaptar su programa del problema de las 8 reinas al paradigma orientado a objetos:
  identifique clases y métodos y reescriba ese programa de forma correspondiente.

* Desarrolle una página web cuya interfaz gráfica se asemeje lo más posible, en cuanto a su apariencia, no en
  cuanto a sus funcionalidades, a la que se muestra en esta imagen:
![Ajedrez](https://raw.githubusercontent.com/fsande/PAI-Labs-Public-Data/master/img/p11_Chess/chess.png "Ajedrez")
  También puede ver la interfaz que se pretende imitar iniciando una partida en 
  [esta página de juego on-line de ajedrez](https://lichess.org).
	Su página ha de imitar colores, tipografías, tamaños y distribución de los elementos.
  En el directorio `img` de este proyecto puede Ud. encontrar imágenes gráficas para las figuras del juego.
  Puede Ud. usar estas u otras si le parecen más adecuadas.

* Se colocarán en la página enlaces similares a los que figuran en la página de referencia, pero en su caso
	esos enlaces no estarán operativos (no enlazan a otras páginas) o en todo caso enlazarán con páginas
  alojadas en su máquina IaaS de la asignatura.

* Añada un pie de página (*footer*) en el que incluya información sobre la Universidad,
  titulación y asignatura.

* Añada en su página los siguientes elementos:

1. Un botón `Generar solución` que al ser pulsado dibuje en el tablero sucesivas soluciones al problema de las 8
reinas.

2. Un segundo botón `Partida de ajedrez` que al ser pulsado dibuje en el tablero la configuración inicial de
las piezas de una partida de ajedrez. 

* Sustituya en su página el panel que figura a la derecha del tablero en la web de referencia e incluya en él
  un panel en el que, para cada solución que se muestre para el problema de las 8 reinas imprima 
	en [notación algebraica](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)) las posiciones que ocupa
	cada una de las 8 reinas ubicadas en el tablero.
	
* No añada a la interfaz gráfica (web) de su programa otros elementos que los que se describen en esta especificación.
  Trate asimismo de ceñirse a la utilización de los elementos HTML y CSS estudiados en las clases de teoría.

### Presentación de resultados
La visualización de la ejecución del programa se realizará a través de una página web alojada
en la máquina IaaS-ULL de la asignatura y cuya URL tendrá la forma:

`http://10.6.129.123:8080/einstein-albert-chess.html` [1]

en la que se incustará un canvas para dibujar el tablero.
Sustituya *Albert Einstein* por su nombre y apellido en la URL de su página.

Utilice código HTML y CSS para imitar en la medida de lo posible la apariencia de la web de referencia
[web de referencia](https://lichess.org/).

Diseñe asimismo otra página HTML simple 

`http://10.6.129.123:8080/index.html` [2]

que sirva de "página índice" para los ejercicios de la sesión de evaluación de la práctica.
La página [1] será uno de los enlaces de [2] y a su vez [1] tendrá un enlace "Home" que apunte a [2].
Enlace también en la página índice [2] las páginas que contienen los informes de documentación y de
cubrimiento de código de su proyecto.
