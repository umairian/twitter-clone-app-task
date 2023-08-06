import { Request, Response } from "express";
import Posts from "../models/post.model";
import utils from "../utils";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text) {
        throw utils.generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty!",
        });
      }

      const post = await Posts.create({
        text,
        author: req.user._id,
      })

      return res.status(200).send({ post });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
