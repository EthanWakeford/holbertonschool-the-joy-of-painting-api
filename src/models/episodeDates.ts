import { Sequelize, DataTypes } from 'sequelize';

export default async (sequelize: Sequelize) => {
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
