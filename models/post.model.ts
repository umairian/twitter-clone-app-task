import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    text: {
      type: String,
      index: true,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      reference: "User",
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      reference: "User"
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);
