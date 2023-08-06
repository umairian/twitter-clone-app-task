import { Request, Response } from "express";
import Users from "../models/user.model";
import utils from "../utils";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config"

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, password, profileUrl } = req.body;

      if (!name || !email || !password) {
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

      let user = await Users.create({ name, email, password: hashedPassword, profileUrl });

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
};
