import { Sequelize, Model } from 'sequelize';
import colorsUsedModel from './colorsUsed';
import episodeDatesModel from './episodeDates';
import subjectMatterModel from './subjectMatter';
import episodesModel from './episodes';
import 'dotenv/config';

async function connectToDB(): Promise<Sequelize> {
  // connect to db
  const { database, username, password, host } = process.env;
  if ([database, username, password, host].some((item) => item === null)) {
    throw new Error('Environment Variable cannot be found');
  }

  const sequelize = new Sequelize(database!, username!, password!, {
    host: host!,
    dialect: 'mysql',
    logging: false,
  });

  // test connection
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  return sequelize;
}

export default async function defineModels() {
  const sequelize: Sequelize = await connectToDB();

  // create Color model
  const Color = await colorsUsedModel(sequelize);

  // create date model
  const Date = await episodeDatesModel(sequelize);

  // create subject model
  const Subject = await subjectMatterModel(sequelize);

  // create episode model
  const Episode = await episodesModel(sequelize);

  // associations
  Color.hasOne(Date, { foreignKey: 'id' });
  Date.belongsTo(Color, { foreignKey: 'id' });

  Date.hasOne(Subject, { foreignKey: 'id' });
  Subject.belongsTo(Date, { foreignKey: 'id' });

  // sync models to DB
  await sequelize.sync({ force: true });

  return {
    Color: Color,
    Date: Date,
    Subject: Subject,
    Episode: Episode,
  };
}
