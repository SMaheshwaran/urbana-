import { Schema, model, models } from "mongoose";

const SuperAdminSchema = new Schema({
  name: {
    type: String,
    unique: [true, "usename should be unique"], // Set the username field as unique
    required: [true, "name is required"],
  },
  role: {
    type: String,
    default: "Super admin",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters long"],
  },
});

const SuperAdmin = models.SuperAdmin || model("SuperAdmin", SuperAdminSchema);

export default SuperAdmin;
