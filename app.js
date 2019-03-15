import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/Books';
import usersRouter from './routes/Users';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

booksRouter(app);
usersRouter(app);

export default app;
