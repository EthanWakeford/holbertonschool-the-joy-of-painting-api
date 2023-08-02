import { resolve } from 'path';

const fs = require('fs');
const { parse } = require('csv-parse');

module.exports = async (path: string) => {
  return new Promise((resolve) => {
    const csvData: Array<object> = [];
    fs.createReadStream(path, { encoding: 'utf8' })
      .pipe(parse({ columns: true }))
      .on('data', (row: any) => {
        csvData.push(row);
      })
      .on('end', () => {
        resolve(csvData);
      });
  });
};
