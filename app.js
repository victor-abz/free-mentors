import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser'; // parsing bodies
import swaggerUi from 'swagger-ui-express';

import routes from './server/routes/index';
import myError from './server/middleware/error';
import swaggerDocument from './swagger.json';

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express(); // setup express application
const server = http.createServer(app);

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing API URL's
app.use('/api/v1', routes);

// Swagger API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importing API URL's
app.use(myError.handle404);
app.use(myError.otherErrors);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default app;