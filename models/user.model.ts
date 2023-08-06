import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      index: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
