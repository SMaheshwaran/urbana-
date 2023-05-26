import { Schema, model, models } from "mongoose";

const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
});

const StaffDetails = models.StaffDetails || model("StaffDetails", StaffSchema);

export default StaffDetails;
