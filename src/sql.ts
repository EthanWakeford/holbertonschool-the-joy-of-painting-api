const { Sequelize, DataTypes } = require('sequelize');
const EpisodeModel = require('./models/Episode');
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
  const Episode = await EpisodeModel(sequelize);
  console.log(Episode === sequelize.models.Episode);

  // sync model to DB
  await Episode.sync({ force: true });
}

parseCsv('datasets/Colors_Used.csv');

try {
  doStuff();
} catch (err) {
  console.log(err);
}
