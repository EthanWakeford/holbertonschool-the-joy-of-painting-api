import { Sequelize, DataTypes } from 'sequelize';
const colorsUsedModel = require('./colorsUsed');

const episodeDateModel = async (sequelize: Sequelize) => {
  const Color = await colorsUsedModel(sequelize);

  const Date = await sequelize.define('Date', {
    colors_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Color,
        key: 'id',
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episode_date: {
      type: DataTypes.DATEONLY,
    },
  });

  return Date;
};

module.exports = episodeDateModel;
