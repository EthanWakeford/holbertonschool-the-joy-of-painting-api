import { Sequelize, DataTypes } from 'sequelize';

export default async (sequelize: Sequelize) => {
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

  return Color;
};
