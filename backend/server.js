import db from './db/connection.js'; // add routes
import routes from './routes/index.js'; //not created yet
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import chalk from 'chalk';

const app = express();
const PORT = 3000; //  process.env.port will be for other servers

app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use('/', routes);

db.on('connected', () => {
  console.clear();
  console.log(chalk.blue(`connected to mongodb`));
  app.listen(PORT, () => {
    console.log(
      `express server running in development on http://localhost:${PORT}`,
    );
  });
});
