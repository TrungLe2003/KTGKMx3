import mongoose from "mongoose";

const schema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const ApiKeysModel = mongoose.model("apiKeys", schema);

export default ApiKeysModel;
