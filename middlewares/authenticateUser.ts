import jwt from "jsonwebtoken";
import config from "../config";
import utils from "../utils";
import Users from "../models/user.model";
import { NextFunction, Request, Response } from "express";

interface JwtPayload {
    _id: string
  }

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    let token = null;
    if(req.header("Authorization")) {
        token = req.header("Authorization")?.split(" ")[1]
    }
    if (!token) {
      throw utils.generateErrorInstance({
        status: 400,
        message: "Authorization Header required",
      });
    }
    const user = await Users.findById(userId);
    if (!user) {
      throw utils.generateErrorInstance({
        status: 404,
        message: "User not Found",
      });
    }
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    if (user._id.toString() !== decoded._id) {
      throw utils.generateErrorInstance({
        status: 401,
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (err: any) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
