const fs = require('fs');
const { parse } = require('csv-parse');

module.exports = async(path: string) => {
  const csvData: Array<object> = [];
  await fs.createReadStream(path, { encoding: 'utf8' })
    .pipe(parse({ columns: true }))
    .on('data', (row: any) => {
      csvData.push(row);
    })
    .on('end', () => {
      console.log('data here', csvData[0]);
    });

  return csvData;
};
