const { Sequelize, DataTypes } = require('sequelize');
const colorsUsedModel = require('./models/colorsUsed');
const episodeDateModel = require('./models/episodeDates');
const SubjectMatterModel = require('./models/subjectMatter');
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
    }
  );

  // test connection
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  // create Color model
  // const Color = await colorsUsedModel(sequelize);
  // console.log(Color === sequelize.models.Color);

  // create date model
  // const Date = await episodeDateModel(sequelize);
  // console.log(Date === sequelize.models.Date);

  // create subject model
  const Subject = await SubjectMatterModel(sequelize);
  console.log(Subject === sequelize.models.Subject);

  // sync models to DB
  // await Color.sync({ force: true });
  // await Date.sync({ force: true });
  await Subject.sync({ force: true });

  // load colors used into DB
  // parseCsv('datasets/ColorsUsed.csv', (header: Array<string>) => header)
  //   .then((data: any) => {
  //     data.forEach((row: any) => {
  //       // sanitze data for db
  //       row['id'] = row.index;
  //       delete row.index;
  //       delete row.colors;
  //       delete row.color_hex;
  //     });
  //     console.log(data[0]);
  //     // fill out table
  //     return Color.bulkCreate(data);
  //   })
  //   .then((colors: any) => {
  //     console.log(colors.length);
  //     console.log(colors[0] instanceof Color);
  //     console.log(colors[0].id);
  //   });

  // load episode dates in DB
  // parseCsv('datasets/Episode_Dates.csv', (header: Array<string>) => [
  //   'title',
  //   'episode_date',
  // ])
  //   .then((data: any) => {
  //     data.forEach((row: any) => {
  //       // sanitize date into proper form for mysql
  //       row.episode_date = createMysqlDate(row.episode_date);
  //     });
  //     return Date.bulkCreate(data);
  //   })
  //   .then((dates: any) => {
  //     console.log(dates[0]);
  //     console.log(dates[0] instanceof Date);
  //     console.log(dates[0].title);
  //   });

  // load subjects into DB
  parseCsv('datasets/Subject_Matter.csv', (header: Array<string>) =>
    header.map((col) => col.toLowerCase())
  )
    .then((data: any) => {
      return Subject.bulkCreate(data);
    })
    .then((subjects: any) => {
      console.log(subjects[0]);
      console.log(subjects[0] instanceof Subject);
      console.log(subjects[0].title);
    });
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
