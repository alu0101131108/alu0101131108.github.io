# Práctica 8. Programación Gráfica en JavaScript. HTML. La API Canvas.
### Factor de ponderación: 8

### Objetivos
Los objetivos de esta práctica son:
 
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

### El conjunto de Mandelbrot

Como es sabido, un número complejo `c` puede representarse como un punto en un espacio bidimensional, el plano
complejo.
El 
[conjunto de Mandelbrot](https://es.wikipedia.org/wiki/Conjunto_de_Mandelbrot)
es un conjunto definido en el plano complejo.
La pertenencia de un número complejo `c` al conjunto se determina en función de la siguiente expresión:

`z = z^2 + c`   [1] 

donde `z` y `c` son números complejos. 

La función tiene la condición inicial `z = c`. 
Lo que habitualmente se calcula es el número de iteraciones necesarias para que `z` alcance algún valor umbral
que en el caso del conjunto de Mandelbrot es:

`|z| > 2.0`     [2]

Si, dentro de un número finito de iteraciones, se cumple la condición anterior, entonces se 
considera que el punto `c` está fuera del conjunto de Mandelbrot.

### La clase *Mandelbrot*
En esta práctica se propone desarrollar una clase `Mandelbrot` 
que posibilite la visualización del conjunto y calcular su área.
La clase ha de encapsularse en un módulo ES6 `mandelbrot.js`.

Previo a la implementación de la clase, diseñe y desarrolle un conjunto de tests para probar el correcto
funcionamiento de todos los métodos de la clase.

La visualización de la ejecución del programa se realizará a través de una página web alojada
en la máquina IaaS-ULL de la asignatura y cuya URL tendrá la forma:

[3] `http://10.6.129.123:8080/einstein-albert-mandelbrot.html`

en la que se incustará un canvas para dibujar el conjunto.
Sustituya *Albert Einstein* por su nombre y apellido en la URL de su página.

El valor del área y el error de la misma se imprimirán asimismo **gráficamente** dentro del canvas.
El resultado de dicha visualización debiera ser similar (a falta del área y error) al que muestra 
[esta página](https://math.hws.edu/eck/js/mandelbrot/MB.html) [4].

Trate de usar elementos HTML y CSS que le permitan imitar -en la medida de lo posible- la estética de la
página anterior.
No se propone en esta práctica que dote de interactividad a los elementos (botones, campos de texto,
selectores, etc.) que figuran en la página anterior.
Sí debe Ud. tratar de imitar los enlaces que aparecen en la página, el tipo de letra o los colores de la
misma.

Diseñe asimismo otra página HTML simple 

[5] `http://10.6.129.123:8080/index.html`

que sirva de "página índice" para los ejercicios de la sesión de evaluación de la práctica.
La página [3] será uno de los enlaces de [5] y a su vez [3] tendrá un enlace "Home" que apunte a [5].
Enlace también en la página índice [5] las páginas que contienen los informes de documentación y de
cubrimiento de código de su proyecto.

## Visualización del conjunto

Para visualizar el conjunto basta recorrer todos los píxeles (puntos) del canvas asignando un color a cada
uno dependiendo del número de iteraciones que precisa el punto en cuestión para determinarse si pertenece
o no al conjunto de Mandelbrot.
Es muy fácil hallar ejemplos de código que realizan este cálculo de diferentes formas.
Puede consultar 
[esta referncia](https://www.codingame.com/playgrounds/2358/how-to-plot-the-mandelbrot-set/adding-some-colors) 
(código en Python) a modo de ejemplo.

Pueden idearse estrategias para que la visualización del conjunto resulte fluída.
Un factor importante para conseguir fluidez es la optimización del código, puesto que se trata de una aplicación intensiva en cómputo.

## Cálculo del área

El cálculo del área del conjunto de Mandelbrot es un problema no trivial, ya que los resultados teóricos y 
numéricos obtenidos para este cálculo no concuerdan. 
Se propone usar el muestreo de Monte Carlo para calcular una solución numérica a este problema.
El método de Monte Carlo que que se propone implica la generación de un gran número de puntos 
aleatorios en el rango `[(-2.0, 0), (0.5, 1.125)]` del plano complejo. 
Cada punto será iterado usando la ecuación [1] hasta un determinado límite (digamos hasta 10000). 
Ese número de iteraciones es el que se elige en el selector *MaxIterations* en la 
[página](https://math.hws.edu/eck/js/mandelbrot/MB.html) [4].
Si dentro de ese número de iteraciones se cumple la condición de umbral, entonces ese punto se considera 
fuera (no perteneciente) del Conjunto de Mandelbrot. 
Al contabilizar el número de puntos aleatorios dentro del conjunto y los que están fuera, se obtiene
una buena aproximación del área del conjunto.
El algoritmo que se propone se describe a continuación:

1. Se genera un conjunto de `N` números complejos aleatorios en el intervalo `[(-2.0, 0), (0.5, 1.125)]`.
2. Realizar el muestreo de Monte Carlo iterando sobre los `N` puntos.  
Para cada punto:

 - Asignar `z = c[i]`

 - Iterar según la ecuación [1], probando la condición umbral [2] en cada iteración:

 - Si no se cumple la condición del umbral, es decir, `|z| <= 2`, entonces repetir la iteración 
  (hasta el número máximo de iteraciones predeterminado). 
	Si después del número máximo de iteraciones la condición sigue sin satisfacerse, entonces 
	añada uno al número total de puntos dentro del conjunto.

 - Si se cumple la condición del umbral, entonces deje de iterar y pase al siguiente punto.
3. Una vez que todos los puntos han sido categorizados como dentro o fuera del conjunto, 
el área estimada y el error vienen dado por las siguientes expresiones:

> Àrea = 2 * 2.5 * 1.125 * N<sub>dentro</sub> / N

> Error = Área / sqrt(N)

Escriba el código para calcular el área y su error.

Nótese que el número de puntos `N` que el programa utilice para calcular el área es un parámetro
que de algún modo habrá que configurar.

(*) Coverage commands:
npx c8 node ./src/assets/js/mandelbrot.mjs
npx c8 --reporter=lcov node ./src/assets/js/mandelbrot.mjs
