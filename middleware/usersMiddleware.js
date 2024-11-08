import ApiKeysModel from "../models/apiKey.js";

const usersMiddleware = {
  register: async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName) throw new Error("Username is missing!");
      if (!email) throw new Error("Email is missing!");
      if (!password) throw new Error("Password is missing!");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
      });
    }
  },
  checkAuth: async (req, res, next) => {
    try {
      const { apiKey } = req.query;
      if (!apiKey) throw new Error("You need signIn!");
      const [_, userId, __, email, ___, randomString] =
        String(apiKey).split("$");
      // console.log(userId, email);

      const CrrUserApiKey = await ApiKeysModel.findOne({ userId: userId });
      // console.log(CrrUserApiKey.email);

      if (
        email !== CrrUserApiKey.email ||
        apiKey !== CrrUserApiKey.apiKey //check trùng randomString luôn
      )
        throw new Error("Hello");
      req.users = {
        userId,
      };
      return next();
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  },
};

export default usersMiddleware;
