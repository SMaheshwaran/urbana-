import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    unique: [true, "usename should be unique"], // Set the username field as unique
    required: [true, "name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should  contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  apartment: {
    type: String,
    required: [true, "apartment no is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters long"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
