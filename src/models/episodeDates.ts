import { Sequelize, DataTypes, Model } from 'sequelize';

export default async (sequelize: Sequelize): Promise<any> => {
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
