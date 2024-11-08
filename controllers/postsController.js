import PostsModel from "../models/posts.js";

const postsController = {
  createPost: async (req, res) => {
    try {
      const { userId } = req.users;
      const { content } = req.body;
      const createPost = await PostsModel.create({
        userId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).send({
        message: "You have posted something!",
        data: createPost,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  updatedPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const crrPost = await PostsModel.findById(postId);
      // console.log(crrPost);

      if (!crrPost) throw new Error("You need post something first!");
      const { content } = req.body;
      crrPost.content = content;
      crrPost.updatedAt = new Date();
      crrPost.save();
      res.status(200).send({
        message: "You have updated your post!",
        data: crrPost,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default postsController;
