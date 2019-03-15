import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/Books';
import usersRouter from './routes/Users';
import authRouter from './routes/Auth';
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);

const auth = authorization(app);

app.use(bodyParser.json());
app.use(auth.initialize());

app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
