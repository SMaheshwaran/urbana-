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

export const PATCH = (req, res) => {};

export const GET = async (req, res) => {
  try {
    await connectDB();
    const allReg = await User.find({ approved: true });
    console.log(allReg);

    return new Response(JSON.stringify(allReg), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to Fetch ", { status: 500 });
  }
};
