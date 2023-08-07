import { Request, Response } from "express";
import Posts from "../models/post.model";
import Users from "../models/user.model";
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
      });

      await Users.findByIdAndUpdate(
        req.user._id,
        { $push: { posts: post._id } },
        { new: true, useFindAndModify: false }
      );

      return res.status(200).send({ post });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;

      await Posts.findByIdAndDelete(postId);

      await Users.findByIdAndUpdate(req.user._id, {
        $pull: { posts: postId }
      })

      return res.status(200).send("Success");
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  like: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { like } = req.query;

      if(like === "1") {
        await Posts.findByIdAndUpdate(postId, {
            $push: { likes: req.user._id }
        })
      } else {
        await Posts.findByIdAndUpdate(postId, {
            $pull: { likes: req.user._id }
        })
      }

      return res.status(200).send("Success");
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
