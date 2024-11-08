import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import RootRouter from "./routers/index.js";

dotenv.config();
const app = express();
app.use(express.json());

await mongoose.connect(process.env.DATABASE_LINK).then(() => {
  console.log("Connected database!");
});

app.get("", (req, res) => {
  res.send({
    message: "Oke1",
  });
});

app.use("/api", RootRouter);

app.listen(8080, (req, res) => {
  console.log("Server is running");
});
