import express from 'express';
import loadDBFromCsv from './sql';
import routes from './routes';
const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use('/', routes);

async function startServer() {
  // load DB
  if (process.env.build === 'true') {
    await loadDBFromCsv();
  }

  // then start server
  console.log('DB Loaded');

  // use middleware and routes
  app.get('/', (req, res) => {
    res.send('idid');
  });
  app.listen(port, () => console.log(`App listening on port ${port}!`));
}

startServer();
