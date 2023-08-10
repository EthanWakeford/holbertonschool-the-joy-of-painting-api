import parseCsv from './parseCsv';
import Color from './models/colorsUsed';
import AirDate from './models/episodeDates';
import Subject from './models/subjectMatter';
import Episode from './models/episodes';
import sequelize, { testConnection } from './connect';

export default async function loadDBFromCsv() {
  // authenticate connection
  testConnection();

  // associate tables
  Color.hasOne(AirDate, { foreignKey: 'id' });
  AirDate.belongsTo(Color, { foreignKey: 'id' });

  AirDate.hasOne(Subject, { foreignKey: 'id' });
  Subject.belongsTo(AirDate, { foreignKey: 'id' });

  // sync db
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
  await AirDate.bulkCreate(immutableDateData);

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
  const joinedData = await Color.findAll({
    attributes: { exclude: ['painting_title', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: AirDate,
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
  });

  // format all into array of objects to be placed into final table
  const episodes: Array<object> = [];
  joinedData.forEach((data: any) => {
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

  // add all objects to final table
  const readOnlyEpisodes: Array<Readonly<Object>> = episodes;
  await Episode.bulkCreate(readOnlyEpisodes);

  const episodeCount = await Episode.count();

  console.log('sql complete!\nEpisode entries count: ', episodeCount);
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
