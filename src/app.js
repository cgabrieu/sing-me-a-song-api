import './setup.js';
import express from 'express';
import cors from 'cors';
import router from './router.js';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(serverMiddlewareError);

export default app;
