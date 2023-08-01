const { Sequelize, DataTypes } = require('sequelize');
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

  // way too long model definition
  const Episode = await sequelize.define('Episode', {
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
      type: DataTypes.STRING,
    },
    episode: {
      type: DataTypes.STRING,
    },
    num_colors: {
      type: DataTypes.STRING,
    },
    youtube_src: {
      type: DataTypes.STRING,
    },
    colors: {
      type: DataTypes.STRING,
    },
    color_hex: {
      type: DataTypes.STRING,
    },
    Black_Gesso: {
      type: DataTypes.STRING,
    },
    Bright_Red: {
      type: DataTypes.STRING,
    },
    Burnt_Umber: {
      type: DataTypes.STRING,
    },
    Cadmium_Yellow: {
      type: DataTypes.STRING,
    },
    Dark_Sienna: {
      type: DataTypes.STRING,
    },
    Indian_Red: {
      type: DataTypes.STRING,
    },
    Indian_Yellow: {
      type: DataTypes.STRING,
    },
    Liquid_Black: {
      type: DataTypes.STRING,
    },
    Midnight_Black: {
      type: DataTypes.STRING,
    },
    Phthalo_Blue: {
      type: DataTypes.STRING,
    },
    Phthalo_Green: {
      type: DataTypes.STRING,
    },
    Prussian_Blue: {
      type: DataTypes.STRING,
    },
    Sap_Green: {
      type: DataTypes.STRING,
    },
    Titanium_White: {
      type: DataTypes.STRING,
    },
    Van_Dyke_Brown: {
      type: DataTypes.STRING,
    },
    Yellow_Ochre: {
      type: DataTypes.STRING,
    },
    Alizarin_Crimson: {
      type: DataTypes.STRING,
    },
  });

  console.log(Episode === sequelize.models.Episode);

  await Episode.sync({ force: true });
}

doStuff();
