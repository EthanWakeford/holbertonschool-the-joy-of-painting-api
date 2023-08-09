import { Sequelize, Model } from 'sequelize';
import colorsUsedModel from './models/colorsUsed';
import episodeDatesModel from './models/episodeDates';
import subjectMatterModel from './models/subjectMatter';
import episodesModel from './models/episodes';
import parseCsv from './parseCsv';
import 'dotenv/config';

export default async function loadDBFromCsv() {
  // connect to db
  const { database, username, password, host } = process.env;
  if ([database, username, password, host].some((item) => item === null)) {
    throw new Error('Environment Variable cannot be found');
  }

  const sequelize = new Sequelize(database!, username!, password!, {
    host: host!,
    dialect: 'mysql',
    logging: false,
  });

  // test connection
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  // create Color model
  const Color = await colorsUsedModel(sequelize);

  // create date model
  const Date = await episodeDatesModel(sequelize);

  // create subject model
  const Subject = await subjectMatterModel(sequelize);

  // create episode model
  const Episode = await episodesModel(sequelize);

  // associations
  Color.hasOne(Date, { foreignKey: 'id' });
  Date.belongsTo(Color, { foreignKey: 'id' });

  Date.hasOne(Subject, { foreignKey: 'id' });
  Subject.belongsTo(Date, { foreignKey: 'id' });

  // sync models to DB
  await sequelize.sync({ force: true });

  // load colors used into DB
  const colorData: Array<Object> = await parseCsv(
    'datasets/Colors_Used.csv',
    (header: Array<string>) => header
  );

  colorData.forEach((row: any) => {
    // sanitze data for db
    row['id'] = row.index;
    delete row.index;
    delete row.colors;
    delete row.color_hex;
  });

  const immutableColorData: Array<Readonly<Object>> = colorData;
  await Color.bulkCreate(immutableColorData);

  // load episode dates in DB
  const dateData = await parseCsv('datasets/Episode_Dates.csv', [
    'title',
    'episode_date',
  ]);

  let colorsId: number = 0;
  dateData.forEach((row: any) => {
    // sanitize date into proper form for mysql
    row.episode_date = createMysqlDate(row.episode_date);
    row['colors_id'] = ++colorsId;
  });

  const immutableDateData: Array<Readonly<Object>> = dateData;
  await Date.bulkCreate(immutableDateData);

  // // load subjects into DB
  const subjectData = await parseCsv(
    'datasets/Subject_Matter.csv',
    (header: Array<string>) => header.map((col) => col.toLowerCase())
  );

  let datesId: number = 0;
  subjectData.forEach((row: any) => {
    // add foreign id key
    row['dates_id'] = ++datesId;
  });

  const immutableSubjectData: Array<Readonly<Object>> = subjectData;
  await Subject.bulkCreate(immutableSubjectData);

  // join tables into one final table
  await Color.findAll({
    attributes: { exclude: ['painting_title', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Date,
        required: true,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [
          {
            model: Subject,
            required: true,
            attributes: {
              exclude: ['title', 'id', 'episode', 'createdAt', 'updatedAt'],
            },
          },
        ],
      },
    ],
  }).then((joinedData) => {
    // format all into array of objects to be placed into final table
    const episodes: Array<object> = [];
    joinedData.forEach((data) => {
      // format subject table
      const subjectValues: any =
        data.dataValues.Date.dataValues.Subject.dataValues;

      // format date table
      const dateValues: any = data.dataValues.Date.dataValues;
      delete dateValues.Subject;

      // format colors table
      const colorValues: any = data.dataValues;
      delete colorValues.Subject;
      delete colorValues.Date;

      // add all to array of episodes
      episodes.push({
        ...subjectValues,
        ...dateValues,
        ...colorValues,
      });
    });
    const readOnlyEpisodes: Array<Readonly<Object>> = episodes;
    console.log('creating episodes');
    Episode.bulkCreate(readOnlyEpisodes);
    console.log('episodes created');
  });

  console.log('sql complete');
}

// takes a date string and converts to YYYY-MM-DD format for mysql
// "May 11, 1984" -> "1984-04-11"
function createMysqlDate(date: string): String {
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
