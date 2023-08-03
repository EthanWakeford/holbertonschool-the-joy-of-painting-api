import { Sequelize, DataTypes } from 'sequelize';

const episodeDateModel = async (sequelize: Sequelize) => {
  const Date = await sequelize.define('Date', {
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
