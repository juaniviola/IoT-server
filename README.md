# 🖥 Servidor IoT

Este es el servidor http, que recibirá y manejará las peticiones hechas desde un microcontrolador.

## 🎉 Descripción

En este proyecto de utiliza las siguientes tecnologías:

- [Node.js](https://nodejs.org)
- *Express*, para el servidor http.
- *Sequelize* + *mysql*, para la conexión a base de datos _mysql_.
- *BodyParser*, para parsear los datos que a tipo _json_.
- *Socket.io*, para comunicación tiempo real.

Cuándo alguien haga una petición http de tipo **post**, el servidor obtiene los datos, los guarda en la base de datos, y emite un evento, para que el cliente pueda ver los datos que llegan en tiempo real

## Microcontrolador

Para este proyecto se utiliza **Arduino** con un sensor _DHT11_ para medir la temperatura y la humedad. Y un _Ethernet shield_ para enviar estos datos a un servidor.