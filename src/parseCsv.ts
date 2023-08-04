const fs = require('fs');
const { parse } = require('csv-parse');

type headerTransformer = (header: Array<string>) => Array<string> | Array<string>;

/**
 * read file from path and parse into array of key, value pairs
 * @path {string}: path to file
 * @headerTransformer {function | array}: transformer function to run on column names of CSV
 * Or array to feed directly as Column names
 */
module.exports = async (path: string, headerTransformer: headerTransformer) => {
  return new Promise((resolve) => {
    const csvData: Array<object> = [];
    fs.createReadStream(path, { encoding: 'utf8' })
      .pipe(
        // take current header and run headerTransformer function on it to
        // create desired columns for our db
        parse({
          columns: headerTransformer,
          ignore_last_delimiters: true,
        })
      )
      .on('data', (row: any) => {
        csvData.push(row);
      })
      .on('end', () => {
        resolve(csvData);
      });
  });
};
