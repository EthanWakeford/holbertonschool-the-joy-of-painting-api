const { Sequelize, DataTypes } = require('sequelize');
const colorsUsedModel = require('./models/colorsUsed');
const episodeDateModel = require('./models/episodeDates');
const subjectMatterModel = require('./models/subjectMatter');
const episodesModel = require('./models/episodes');
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
      host: process.env.host,
      dialect: 'mysql',
      logging: false,
    }
  );

  // test connection
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  // create Color model
  const Color = await colorsUsedModel(sequelize);

  // create date model
  const Date = await episodeDateModel(sequelize);

  // create subject model
  const Subject = await subjectMatterModel(sequelize);

  // associations
  Color.hasOne(Date, { foreignKey: 'id' });
  Date.belongsTo(Color, { foreignKey: 'id' });

  Date.hasOne(Subject, { foreignKey: 'id' });
  Subject.belongsTo(Date, { foreignKey: 'id' });

  // Joins??????
  Color.findAll({
    // where: { id: 1 },
    // attributes: ['id', 'num_colors', 'Date.episode_date'],
    include: [
      {
        model: Date,
        required: true,
        include: [
          {
            model: Subject,
            required: true,
          },
        ],
      },
    ],
  }).then((episodes: any) => {
    // console.log(episodes[0].dataValues);
    console.log(episodes[0].dataValues.Date.dataValues.Subject.dataValues)
  });

  // const f = await Color.findAll({
  //   where: {id: 1},
  //   attributes: ['id', 'num_colors'],
  // });
  // console.log(f[0].dataValues);

  // sync models to DB
  // await sequelize.sync({ force: true });

  // load colors used into DB
  // parseCsv('datasets/Colors_Used.csv', (header: Array<string>) => header)
  //   .then((data: any) => {
  //     data.forEach((row: any) => {
  //       // sanitze data for db
  //       row['id'] = row.index;
  //       delete row.index;
  //       delete row.colors;
  //       delete row.color_hex;
  //     });
  //     // fill out table
  //     return Color.bulkCreate(data);
  //   })
  //   .then((colors: any) => {
  //     // console.log(colors.length);
  //     // console.log(colors[0] instanceof Color);
  //     // console.log(colors[0].id);
  //   });

  // load episode dates in DB
  // parseCsv('datasets/Episode_Dates.csv', ['title', 'episode_date'])
  //   .then((data: any) => {
  //     data.forEach((row: any) => {
  //       // sanitize date into proper form for mysql
  //       row.episode_date = createMysqlDate(row.episode_date);
  //     });
  //     return Date.bulkCreate(data);
  //   })
  //   .then((dates: any) => {
  //     // console.log(dates[0]);
  //     // console.log(dates[0] instanceof Date);
  //     // console.log(dates[0].title);
  //   });

  // // load subjects into DB
  // parseCsv('datasets/Subject_Matter.csv', (header: Array<string>) =>
  //   header.map((col) => col.toLowerCase())
  // )
  //   .then((data: any) => {
  //     return Subject.bulkCreate(data);
  //   })
  //   .then((subjects: any) => {
  //     // console.log(subjects[0]);
  //     // console.log(subjects[0] instanceof Subject);
  //     // console.log(subjects[0].title);
  //   });

  console.log('done');
}

try {
  doStuff();
} catch (err) {
  console.log(err);
}

function createMysqlDate(date: string) {
  // slice first and last characters off, removing '(' & ')'
  date = date.replace(/[()]/g, '');

  // parse date string
  const dateValue = Date.parse(date);

  // convert to date object
  const dateObject = new Date(dateValue);

  // pull out parts of date
  const year = String(dateObject.getFullYear());
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  // return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}
