import { Schema, model, models } from "mongoose";

const AdminRegSchema = new Schema({
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
    default: "Admin",
  },
});

const AdminReg = models.AdminReg || model("AdminReg", AdminRegSchema);

export default AdminReg;
