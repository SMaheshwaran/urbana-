import { Schema, model, models } from "mongoose";

const AdminRegSchema = new Schema({
  name: {
    type: String,
    unique: [true, "usename should be unique"], // Set the username field as unique
    required: [true, "name is required"],
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
});

const AdminReg = models.AdminReg || model("AdminReg", AdminRegSchema);

export default AdminReg;
