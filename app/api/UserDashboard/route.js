import { connectDB } from "@/utils/database";

import NotifyUser from "@/models/NotifyUser";
import User from "@/models/UserRegiser";

// export const POST = async (req, res) => {
//   const { username } = await req.json();

//   console.log(username);

//   try {
//     await connectDB();
//     const userExists = await User.findOne({username: username});
//     console.log(userExists);
//     if(userExists){
//         const
//     }
//   } catch (error) {

//   }
// };

export const POST = async (req, res) => {
  // console.log(req);
  const { username } = await req.json();
  console.log(username);
  try {
    await connectDB();
    const userExists = await User.findOne({ username: username });
    console.log(userExists);
    if (userExists) {
      const notification = await NotifyUser.find({ nameOfUser: username });

      return new Response(JSON.stringify(notification), {
        status: 201,
      });
    } else {
      console.log("user not found");
    }
  } catch (error) {
    return new Response("failed to Fetch ", { status: 500 });
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
    notification.Denied = true;
    await notification.save();

    return new Response(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the notificaation", { status: 500 });
  }
};
