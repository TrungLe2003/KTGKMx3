import mongoose from "mongoose";

const schema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const PostsModel = mongoose.model("posts", schema);

export default PostsModel;
