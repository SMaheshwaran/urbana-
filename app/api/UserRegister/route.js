import { connectDB } from "@/utils/database";
import User from "@/models/UserRegiser";

export const POST = async (req, res) => {
  const { name, apartment, username, password } = await req.json();
  console.log(name, apartment, username, password);

  try {
    await connectDB();

    const existingAdmin = await User.findOne({ username });

    if (existingAdmin) {
      // Username already exists, return an appropriate response
      return new Response("Username already exists", {
        status: 409,
      });
      // return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = new User({
      name,
      username,
      apartment,
      password,
    });

    await newUser.save();
    console.log(newUser);

    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to register new user", { status: 500 });
  }
};
