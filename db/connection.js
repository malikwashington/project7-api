import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.set('returnOriginal', false);

mongoose.connect('mongodb://127.0.0.1:27017/league-api').catch((err) => {
  console.log(`error connection go to mongodb: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(chalk.bold('disconnected from mongodb'));
});

mongoose.connection.on('error', (err) => {
  console.log(chalk.red(`mongodb connection error: ${err}`));
});

export default mongoose.connection;
