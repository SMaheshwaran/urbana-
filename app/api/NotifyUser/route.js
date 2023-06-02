import { connectDB } from "@/utils/database";

import NotifyUser from "@/models/NotifyUser";
import User from "@/models/UserRegiser";
export const POST = async (req, res) => {
  const { nameOfUser, apartment, notificationType, Message } = await req.json();

  console.log(nameOfUser, apartment, notificationType, Message);

  try {
    await connectDB();

    const newNotification = new NotifyUser({
      nameOfUser: nameOfUser,
      apartment: apartment,
      notificationType: notificationType,
      Message: Message,
    });
    console.log(newNotification);

    await newNotification.save();
    console.log(newNotification);
    return new Response(JSON.stringify(newNotification), {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new Response("failed to save the notification", { status: 500 });
  }
};

export const PATCH = async (req, res) => {
  const { _id } = await req.json();

  try {
    await connectDB();

    const notification = await NotifyUser.findById(_id);
    if (!notification)
      return new Response("Notification not found", {
        status: 404,
      });

    notification.Notified = true;
    notification.Approved = true;
    await notification.save();

    return new Response(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the notificaation", { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectDB();

    const notifications = await User.find({});
    console.log(notifications);

    return new Response(JSON.stringify(notifications), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch", { status: 500 });
  }
};
