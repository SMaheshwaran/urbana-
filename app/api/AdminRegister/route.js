import { connectDB } from "@/utils/database";

import AdminReg from "@/models/AdminRegister";

export const POST = async (req, res) => {
  const { name, password } = await req.json();
  console.log(name, password);
  try {
    await connectDB();

    const newRegister = new AdminReg({
      name,
      password,
    });
    await newRegister.save();
    console.log(newRegister);

    return new Response(JSON.stringify(newRegister), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to register new admin", { status: 500 });
  }
};
