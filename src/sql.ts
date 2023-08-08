const { Sequelize, DataTypes, Model } = require('sequelize');
// const colorsUsedModel = require('./models/colorsUsed');
// const episodeDateModel = require('./models/episodeDates');
// const subjectMatterModel = require('./models/subjectMatter');
const episodesModel = require('./models/episodes');
const parseCsv = require('./parseCsv');
// load .env file into env
require('dotenv').config();

type GenericModel = typeof Model

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
  // const Color = await colorsUsedModel(sequelize);
  const Color = await sequelize.define('Color', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    painting_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img_src: {
      type: DataTypes.STRING,
    },
    painting_title: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.BOOLEAN,
    },
    episode: {
      type: DataTypes.BOOLEAN,
    },
    num_colors: {
      type: DataTypes.BOOLEAN,
    },
    youtube_src: {
      type: DataTypes.STRING,
    },
    Black_Gesso: {
      type: DataTypes.BOOLEAN,
    },
    Bright_Red: {
      type: DataTypes.BOOLEAN,
    },
    Burnt_Umber: {
      type: DataTypes.BOOLEAN,
    },
    Cadmium_Yellow: {
      type: DataTypes.BOOLEAN,
    },
    Dark_Sienna: {
      type: DataTypes.BOOLEAN,
    },
    Indian_Red: {
      type: DataTypes.BOOLEAN,
    },
    Indian_Yellow: {
      type: DataTypes.BOOLEAN,
    },
    Liquid_Black: {
      type: DataTypes.BOOLEAN,
    },
    Midnight_Black: {
      type: DataTypes.BOOLEAN,
    },
    Phthalo_Blue: {
      type: DataTypes.BOOLEAN,
    },
    Phthalo_Green: {
      type: DataTypes.BOOLEAN,
    },
    Prussian_Blue: {
      type: DataTypes.BOOLEAN,
    },
    Sap_Green: {
      type: DataTypes.BOOLEAN,
    },
    Titanium_White: {
      type: DataTypes.BOOLEAN,
    },
    Van_Dyke_Brown: {
      type: DataTypes.BOOLEAN,
    },
    Yellow_Ochre: {
      type: DataTypes.BOOLEAN,
    },
    Alizarin_Crimson: {
      type: DataTypes.BOOLEAN,
    },
  });
  // create date model
  // const Date = await episodeDateModel(sequelize);
  const Date = await sequelize.define('Date', {
    // colors_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Color,
    //     key: 'id',
    //   },
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episode_date: {
      type: DataTypes.DATEONLY,
    },
  });

  // create subject model
  // const Subject = await subjectMatterModel(sequelize);
  const Subject = await sequelize.define('Subject', {
    // dates_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Date,
    //     key: 'id',
    //   },
    // },
    episode: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    apple_frame: {
      type: DataTypes.BOOLEAN,
    },
    aurora_borealis: {
      type: DataTypes.BOOLEAN,
    },
    barn: {
      type: DataTypes.BOOLEAN,
    },
    beach: {
      type: DataTypes.BOOLEAN,
    },
    boat: {
      type: DataTypes.BOOLEAN,
    },
    bridge: {
      type: DataTypes.BOOLEAN,
    },
    building: {
      type: DataTypes.BOOLEAN,
    },
    bushes: {
      type: DataTypes.BOOLEAN,
    },
    cabin: {
      type: DataTypes.BOOLEAN,
    },
    cactus: {
      type: DataTypes.BOOLEAN,
    },
    circle_frame: {
      type: DataTypes.BOOLEAN,
    },
    cirrus: {
      type: DataTypes.BOOLEAN,
    },
    cliff: {
      type: DataTypes.BOOLEAN,
    },
    clouds: {
      type: DataTypes.BOOLEAN,
    },
    conifer: {
      type: DataTypes.BOOLEAN,
    },
    cumulus: {
      type: DataTypes.BOOLEAN,
    },
    deciduous: {
      type: DataTypes.BOOLEAN,
    },
    diane_andre: {
      type: DataTypes.BOOLEAN,
    },
    dock: {
      type: DataTypes.BOOLEAN,
    },
    double_oval_frame: {
      type: DataTypes.BOOLEAN,
    },
    farm: {
      type: DataTypes.BOOLEAN,
    },
    fence: {
      type: DataTypes.BOOLEAN,
    },
    fire: {
      type: DataTypes.BOOLEAN,
    },
    florida_frame: {
      type: DataTypes.BOOLEAN,
    },
    flowers: {
      type: DataTypes.BOOLEAN,
    },
    fog: {
      type: DataTypes.BOOLEAN,
    },
    framed: {
      type: DataTypes.BOOLEAN,
    },
    grass: {
      type: DataTypes.BOOLEAN,
    },
    guest: {
      type: DataTypes.BOOLEAN,
    },
    half_circle_frame: {
      type: DataTypes.BOOLEAN,
    },
    half_oval_frame: {
      type: DataTypes.BOOLEAN,
    },
    hills: {
      type: DataTypes.BOOLEAN,
    },
    lake: {
      type: DataTypes.BOOLEAN,
    },
    lakes: {
      type: DataTypes.BOOLEAN,
    },
    lighthouse: {
      type: DataTypes.BOOLEAN,
    },
    mill: {
      type: DataTypes.BOOLEAN,
    },
    moon: {
      type: DataTypes.BOOLEAN,
    },
    mountain: {
      type: DataTypes.BOOLEAN,
    },
    mountains: {
      type: DataTypes.BOOLEAN,
    },
    night: {
      type: DataTypes.BOOLEAN,
    },
    ocean: {
      type: DataTypes.BOOLEAN,
    },
    oval_frame: {
      type: DataTypes.BOOLEAN,
    },
    palm_trees: {
      type: DataTypes.BOOLEAN,
    },
    path: {
      type: DataTypes.BOOLEAN,
    },
    person: {
      type: DataTypes.BOOLEAN,
    },
    portrait: {
      type: DataTypes.BOOLEAN,
    },
    rectangle_3d_frame: {
      type: DataTypes.BOOLEAN,
    },
    rectangular_frame: {
      type: DataTypes.BOOLEAN,
    },
    river: {
      type: DataTypes.BOOLEAN,
    },
    rocks: {
      type: DataTypes.BOOLEAN,
    },
    seashell_frame: {
      type: DataTypes.BOOLEAN,
    },
    snow: {
      type: DataTypes.BOOLEAN,
    },
    snowy_mountain: {
      type: DataTypes.BOOLEAN,
    },
    split_frame: {
      type: DataTypes.BOOLEAN,
    },
    steve_ross: {
      type: DataTypes.BOOLEAN,
    },
    structure: {
      type: DataTypes.BOOLEAN,
    },
    sun: {
      type: DataTypes.BOOLEAN,
    },
    tomb_frame: {
      type: DataTypes.BOOLEAN,
    },
    tree: {
      type: DataTypes.BOOLEAN,
    },
    trees: {
      type: DataTypes.BOOLEAN,
    },
    triple_frame: {
      type: DataTypes.BOOLEAN,
    },
    waterfall: {
      type: DataTypes.BOOLEAN,
    },
    waves: {
      type: DataTypes.BOOLEAN,
    },
    windmill: {
      type: DataTypes.BOOLEAN,
    },
    window_frame: {
      type: DataTypes.BOOLEAN,
    },
    winter: {
      type: DataTypes.BOOLEAN,
    },
    wood_framed: {
      type: DataTypes.BOOLEAN,
    },
  });

  // create episode model
  const Episode = await episodesModel(sequelize);

  // associations
  Color.hasOne(Date, { foreignKey: 'id' });
  Date.belongsTo(Color, { foreignKey: 'id' });

  Date.hasOne(Subject, { foreignKey: 'id' });
  Subject.belongsTo(Date, { foreignKey: 'id' });

  // const f = await Color.findAll({
  //   where: {id: 1},
  //   attributes: ['id', 'num_colors'],
  // });
  // console.log(f[0].dataValues);

  // sync models to DB
  await sequelize.sync({ force: true });

  // load colors used into DB
  await parseCsv('datasets/Colors_Used.csv', (header: Array<string>) => header)
    .then((data: any) => {
      data.forEach((row: any) => {
        // sanitze data for db
        row['id'] = row.index;
        delete row.index;
        delete row.colors;
        delete row.color_hex;
      });
      // fill out table
      return Color.bulkCreate(data);
    })
    .then((colors: any) => {
      // console.log(colors.length);
      // console.log(colors[0] instanceof Color);
      // console.log(colors[0].id);
    });

  // load episode dates in DB
  await parseCsv('datasets/Episode_Dates.csv', ['title', 'episode_date'])
    .then((data: any) => {
      let colorsId = 0;
      data.forEach((row: any) => {
        // sanitize date into proper form for mysql
        row.episode_date = createMysqlDate(row.episode_date);
        row['colors_id'] = ++colorsId;
      });
      return Date.bulkCreate(data);
    })
    .then((dates: any) => {
      // console.log(dates[0]);
      // console.log(dates[0] instanceof Date);
      // console.log(dates[0].title);
    });

  // // load subjects into DB
  await parseCsv('datasets/Subject_Matter.csv', (header: Array<string>) =>
    header.map((col) => col.toLowerCase())
  )
    .then((data: any) => {
      let datesId = 0;
      data.forEach((row: any) => {
        // add foreign id key
        row['dates_id'] = ++datesId;
      });
      return Subject.bulkCreate(data);
    })
    .then((subjects: any) => {
      // console.log(subjects[0]);
      // console.log(subjects[0] instanceof Subject);
      // console.log(subjects[0].title);
    });

  // Joins??????
  // await Color.findAll({
  //   include: [{
  //     model: Date,
  //     required: true,
  //   }]
  // }).then((data: any) => {
  //   console.log(data)
  // })
  await Color.findAll({
    // where: { id: 1 },
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
  }).then((joinedData: Array<GenericModel>) => {
    // console.log(episodes[0].dataValues);
    // console.log(joinedData[0].dataValues.Date.dataValues.Subject)

    // format all into array of objects to be placed into final table
    const episodes: Array<object> = [];
    joinedData.forEach((data: GenericModel) => {
      // format subject table
      const subjectValues: any =
        data.dataValues.Date.dataValues.Subject.dataValues;
      // console.log('subject', subjectValues);

      // format date table
      const dateValues: any = data.dataValues.Date.dataValues;
      delete dateValues.Subject;
      // console.log('date', dateValues);

      // format colors table
      const colorValues: any = data.dataValues;
      delete colorValues.Subject;
      delete colorValues.Date;
      // console.log('color', colorValues);

      // add all to array of episodes
      episodes.push({
        ...subjectValues,
        ...dateValues,
        ...colorValues,
      });
    });
  
  console.log('episode one ', episodes[0]);

  Episode.bulkCreate(episodes);
  });
}

try {
  doStuff();
} catch (err) {
  console.log(err);
} finally {
  console.log('done');
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


async function loadColors() {
  
}
