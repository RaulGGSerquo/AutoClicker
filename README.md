# AutoClicker

Para la utilización de la aplicación en producción, debe acceder al siguiente enlace https://autoclicker.vercel.app/

Para la utilización de la aplicación en local, deberá clonar el repositorio y una vez dentro de él, deberá ejecutar una serie de comandos:
* npm install (para instalar las dependencias necesarias para la correcta ejecución)
* npm run web (para ejecutar la aplicación en la web, se abrirá automáticamente)

También se podrá ejecutar los test con el comando ```npm run test```.

## Instucciones de uso

En la pantalla principal encontaremos el inicio de sesión, necesario para poder continuar con el juego. Se debe introducir un nombre antes de continuar. También veremos un botón de Ranking donde encontraremos un ranking de los usuarios con más puntos ordenados de mayor a menor.

Una vez entremos en el juego, veremos la cantidad de puntos (en este caso es dinero), y un botón "Generar". Cada vez que pulsemos a este botón, se ganarán puntos, de inicio se ganará de uno en uno.

A los 25 puntos, se podrá comprar una mejora del click, botón "Comprar mejora click". Con este botón mejoramos el click de manera que pasaremos a ganar un punto más cada vez que hagamos click en el primer botón.

Cuando se llegan a los 50 puntos, se habilitará un nuevo botón, "Comprar generador". Cuando obtenemos esta habilidad, se generarán ountos de manera automática, se manera que se genera un punto cada 100 milisegundos. Con cada compra de esta habilidad se ganará un punto más.

Una vez obtenemos la habilidad con el botón anterior, se desbloquea un nuevo botón, "Comprar mejora generador". Esta habilidad mejora la potencia del generador, de manera que los puntos ganados con el generador se multiplicarán por el número de veces que se ha adquirido esta habilidad.