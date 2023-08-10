// connects to db
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { database, username, password, host } = process.env;
if ([database, username, password, host].some((item) => item === null)) {
  throw new Error('Environment Variable cannot be found');
}

const sequelize = new Sequelize(database!, username!, password!, {
  host: host!,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;

export async function testConnection() {
  sequelize
    .authenticate()
    .then(() => console.log('Database has Connected'))
    .catch((err) => {
      throw new Error(err);
    });
}
