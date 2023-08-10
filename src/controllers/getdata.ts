import { Request, Response } from "express";
import Episode from "../models/episodes";

export default class GetData {
  static async episodes(req: Request, res: Response) {
    const {month, subjects, colors} = req.query;

    const count = await Episode.count();
    console.log(count);
  }
}
