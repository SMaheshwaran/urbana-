import { Schema, model, models } from "mongoose";

const NotifyUserSchema = new Schema({
  nameOfUser: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  notificationType: {
    type: Number,
    required: true,
  },
  Notified: {
    type: Boolean,
    default: false,
  },
  Approved: {
    type: Boolean,
    default: false,
  },
  Denied: {
    type: Boolean,
    default: false,
  },
  Message: {
    type: String,
    required: true,
  },
  timeOfNotification: {
    type: Date,
    default: Date.now, // Set default value to current date and time
    required: true,
  },
});

const NotifyUser = models.NotifyUser || model("NotifyUser", NotifyUserSchema);

export default NotifyUser;
