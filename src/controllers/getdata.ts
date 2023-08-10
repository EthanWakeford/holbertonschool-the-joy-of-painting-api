import { Op, Sequelize } from 'sequelize';
import { Request, Response } from 'express';
import sequelize from '../connect';
import Episode from '../models/episodes';

export default class GetData {
  static async episodes(req: Request, res: Response) {
    const { month, subjects, colors, filter_type = 'orq' } = req.query;

    // check if more than one query type
    const multipleQueries: Boolean =
      [month, subjects, colors].filter(Boolean).length > 1;

    // if no query exists
    if (![month, subjects, colors].some((x) => x)) {
      // return all values in table
      const data = await Episode.findAll({
        raw: true,
      });
      return res.json(data);
    }

    // filter type must be either "and" or "or" if more than one query used
    if (
      multipleQueries &&
      (typeof filter_type !== 'string' || !['or', 'and'].includes(filter_type))
    ) {
      return res.status(400).send('invalid filter type, must be "and" or "or"');
    }

    // build query
    // path/?month=january,march&colors=cadmium_yellow ->
    // [{month: january}, {month: march}, {colors: cadmium_yellow}]
    const query: Object[] | Sequelize = [];
    const test: Object[] | Sequelize = [
      { id: 1 },
      sequelize.where(sequelize.fn('month', sequelize.col('episode_date')), 1),
    ];

    if (typeof month === 'string') {
      const monthValues = month.split(',').filter((x) => x);
      if (monthValues.length > 0) {
        monthValues.forEach((item) => {
          query.push(
            sequelize.where(
              sequelize.fn('month', sequelize.col('episode_date')),
              item
            )
          );
        });
      }
    }

    if (typeof colors === 'string') {
      const colorValues = colors.split(',').filter((x) => x);
      if (colorValues.length > 0) {
        colorValues.forEach((item) => {
          query.push({
            [item]: 1,
          });
        });
      }
    }

    if (typeof subjects === 'string') {
      const subjectValues = subjects.split(',').filter((x) => x);
      if (subjectValues.length > 0)
        subjectValues.forEach((item) => {
          query.push({
            [item]: 1,
          });
        });
    }

    console.log(query);

    const Response = await Episode.findAll({
      where: {
        [filter_type === 'and' ? Op.and : Op.or]: query,
      },
    });
    return res.send(Response);
  }

  static buildQuery(queryStr: string, name: string, dest: Object[]) {
    queryStr.split(',').forEach((item) => {
      dest.push({ [name]: item });
    });
  }
}
