import { DataTypes} from 'sequelize';
import sequelize from '../connect';

const Date = sequelize.define('Date', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  episode_date: {
    type: DataTypes.DATEONLY,
  },
});

export default Date;
