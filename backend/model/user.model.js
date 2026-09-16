import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  },
});

const user = mongoose.model("user", userSchema);

export default user;
