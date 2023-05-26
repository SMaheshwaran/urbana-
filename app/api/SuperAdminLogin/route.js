import { connectDB } from "@/utils/database";

import SuperAdmin from "@/models/SuperAdminLogin";

export const POST = async (req, res) => {
  const { name, password } = await req.json();
  console.log(name, password);
  try {
    await connectDB();

    // const newLogin = new SuperAdmin({
    //   name: name,
    //   password: password,
    // });
    const newLogin = await SuperAdmin.find({
      name: name,
      password: password,
    });
    console.log(newLogin);

    return new Response(JSON.stringify(newLogin), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to Login new admin", { status: 500 });
  }
};
