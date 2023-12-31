import { Request, Response } from "express";
import Users from "../models/user.model";
import Posts from "../models/post.model";
import Followers from "../models/follower.model";
import utils from "../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, password, profileUrl } = req.body;

      if (!name || !email || !password || !profileUrl) {
        throw utils.generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty!",
        });
      }

      const emailFound = await Users.findOne({ email });
      if (emailFound) {
        throw utils.generateErrorInstance({
          status: 409,
          message: "Email already exists!",
        });
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      let user = await Users.create({
        name,
        email,
        password: hashedPassword,
        profileUrl,
      });

      user = user.toJSON();
      user.password = "";

      const token = jwt.sign(user, config.jwtSecret);

      return res.status(200).send({ user, token });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw utils.generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty!",
        });
      }

      let user = await Users.findOne({ email });
      if (!user) {
        throw utils.generateErrorInstance({
          status: 404,
          message: "User not found!",
        });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        throw utils.generateErrorInstance({
          status: 401,
          message: "Invalid Password",
        });
      }

      user = user.toJSON();
      user.password = "";

      const token = jwt.sign(user, config.jwtSecret);

      return res.status(200).send({ user, token });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  profile: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;

      const profile = await Users.findById(userId)
        .populate({
          path: "posts",
          options: { sort: { createdAt: "desc" } },
        })
        .populate("followers")
       

      const isFollowing = profile?.followers.find(
        (follower) => follower._id.toString() === req.user._id.toString()
      )
        ? true
        : false;

      return res.status(200).send({ profile, isFollowing });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  search: async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const { term } = query;

      const users = await Users.find({
        _id: { $ne: req.user._id },
        name: { $regex: term, $options: "i" },
      });

      return res.status(200).send({ users });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  follow: async (req: Request, res: Response) => {
    try {
      const { body, user } = req;
      const { followingUserId } = body;

      await Followers.create({
        follower: user._id,
        following: followingUserId,
      });

      await Promise.all([
        Users.findByIdAndUpdate(
          user._id,
          { $push: { following: followingUserId } },
          { new: true, useFindAndModify: false }
        ),
        Users.findByIdAndUpdate(
          followingUserId,
          { $push: { followers: user._id } },
          { new: true, useFindAndModify: false }
        ),
      ]);

      return res.status(200).send("Successfull");
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  home: async (req: Request, res: Response) => {
    try {
      const posts = await Posts.find({
        author: req.user.following
      }).sort({ createdAt: "desc" }).populate("author")

      return res.status(200).send({ posts });
    } catch (err: any) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
