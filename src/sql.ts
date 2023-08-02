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

  parseCsv('datasets/Colors_Used.csv')
    .then((data: any) => {
      data.forEach((element: any) => {
        element['id'] = element.index;
        delete element.index;
        delete element.colors;
        delete element.color_hex;
      });
      console.log(data[0]);
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