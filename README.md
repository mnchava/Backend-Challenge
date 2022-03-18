# Jr Back-End Challenge
*Jesus Salvador Uribe - Marzo 2021*

| Endpoint | Function | HTTP Verb |
|----------|-------------------|-----------|
| /alpha   | Alphabetize (orders alphabetically) the keys in the request JSON payload, load the request into a database and returns the resulting JSON back in the HTTP response| PUT|
| /flatten | Flatten any JSON Arrays in the request JSON payload (comma separated) such that the resulting JSON does not contain any JSON Arrays| POST|
| /quote   | Consulta https://programming-quotes-api.herokuapp.com/quotes/random para obtener un cita. Y regresar el resultado| POST      |
| /quotes  | Se espera que: - Todos las citas sean regresadas - Las citas se agrupen por autor y esten ordenadas alfabéticamente - No se debe mostrar el autor en cada una de las citas - Dentro de cada autor las citas se deben mostrar en orden descendente según la fecha de consulta |  GET      |

📦 Paquetes de Node.js utilizados:

- Express.js
- Jest
- Supertest
- dot-env
- cross-fetch
- mongoose
- body-parser

Desplegado en Heroku con actualizaciones directas desde este repo.

https://nuclea-challenge.herokuapp.com/

Los endpoints siguen este URL, por ejemplo para la funcion quotes se manda un request GET a https://nuclea-challenge.herokuapp.com/quotes

