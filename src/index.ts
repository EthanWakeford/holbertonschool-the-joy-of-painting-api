import express from 'express';
import loadDBFromCsv from './sql';
import routes from '../routes';
const app = express();
const port = process.env.port || 3000;

// Load DB
loadDBFromCsv()
  // then start server
  .then(() => {
    console.log('DB Loaded');

    // use middleware and routes
    app.use(express.json);
    app.use('/', routes);

    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((err) => {
    console.log(err);
  });
