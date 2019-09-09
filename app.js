import http from 'http';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
// import db from './server/db'

// new db().createTables();

import routes from './server/routes/index';
import myError from './server/middleware/error';
import swaggerDocument from './swagger.json';


const port = process.env.PORT || 3000;
const app = express(); // setup express application
const server = http.createServer(app);

dotenv.config();

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing API URL's
// app.use('/api/v1', routes);
app.use('/', routes);
// Swagger API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importing API URL's
app.use(myError.handle404);
app.use(myError.otherErrors);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});

export default app;