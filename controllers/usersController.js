import bcrypt from "bcrypt";
import crypto from "crypto";
import ApiKeysModel from "../models/apiKey.js";
import UserModel from "../models/Users.js";

const UsersController = {
  register: async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).send({
        message: "Register success!",
        data: newUser,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const crrAccount = await UserModel.findOne({ email: email }); //check mail
      if (!crrAccount) throw new Error("Email or password is invalid");
      console.log(crrAccount.email);

      const checkPassword = bcrypt.compareSync(password, crrAccount.password);
      if (!checkPassword) throw new Error("Email or password is invalid");
      const randomString = crypto.randomUUID();
      const apiKey = ` mern-$${crrAccount._id}$-$${crrAccount.email}$-$${randomString}$`;
      await ApiKeysModel.findOneAndUpdate(
        { userId: crrAccount._id }, //điều kiện tìm
        { apiKey: apiKey, email: crrAccount.email }, //updates
        { upsert: true, new: true } //trả ra kết quả sau cập nhật (new) -> cập nhật nếu đã có, nếu chưa có thì tạo mới (upsert)
      );
      res.status(200).send({
        message: "LogIn Success!",
        data: apiKey,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default UsersController;

// Model.findOneAndUpdate(filter, update, options) -> 3 tham số
/*
filter: giúp tìm kiếm xem cái nào được cập nhật (tìm bằng userId)
update: cập nhật cái gì
options: kiểm soát sau khi cập nhập (trường new, upsert)
  -> new: true (kqua trả là sau khi cập nhât), false (kết quả trả là trước khi cập nhật)
  -> upsert: true (tạo bản ghi mới nếu không tìm thấy cái tương ứng với filter, tự thêm cả userid luôn), false là mặc định

*/
