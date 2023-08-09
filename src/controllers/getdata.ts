import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import episodesModel from "../models/episodes";

export default class GetData {
  static async episodes(req: Request, res: Response) {
    const {month, subjects, colors} = req.query;


  }
}
