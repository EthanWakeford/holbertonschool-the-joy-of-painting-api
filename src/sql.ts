const { Sequelize, DataTypes } = require('sequelize');
const colorsUsedModel = require('./models/colorsUsed');
const parseCsv = require('./parseCsv');
// load .env file into env
require('dotenv').config();

async function doStuff() {
  // connect to db
  const sequelize = new Sequelize(
    process.env.database,
    process.env.username,
    process.env.password,
    {
      host: 'localhost',
      dialect: 'mysql',
    }
  );

  // test connection
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  // create model
  const Episode = await colorsUsedModel(sequelize);
  console.log(Episode === sequelize.models.Episode);

  // sync model to DB
  await Episode.sync({ force: true });

  parseCsv('datasets/Colors_Used.csv')
    .then((data: any) => {
      data.forEach((row: any) => {
        // sanitze data for db
        row['id'] = row.index;
        delete row.index;
        delete row.colors;
        delete row.color_hex;
      });
      console.log(data[0]);
      // fill out table
      return Episode.bulkCreate(data);
    })
    .then((episodes: any) => {
      console.log(episodes.length);
      console.log(episodes[0] instanceof Episode);
      console.log(episodes[0].id);
    });
}

try {
  doStuff();
} catch (err) {
  console.log(err);
}
