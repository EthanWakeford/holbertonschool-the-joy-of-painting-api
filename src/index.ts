import express, { Express, Request, Response } from 'express';
import loadDBFromCsv from './sql';
const app = express();
const port = 3000;

// Load DB
try {
  loadDBFromCsv().then(() => {
    console.log('DB Loaded');
    app.get('/', (req, res: Response) => res.send('Hello World!'));
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  });
} catch (err) {
  console.log(err);
}
