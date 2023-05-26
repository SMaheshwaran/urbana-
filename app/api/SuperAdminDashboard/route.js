import { connectDB } from "@/utils/database";

// import SuperAdmin from "@/models/SuperAdminLogin";
import AdminReg from "@/models/AdminRegister";
export const GET = async (req, res) => {
  //   const { name, password } = await req.json();
  //   console.log(name, password);
  try {
    await connectDB();

    // const newLogin = new SuperAdmin({
    //   name: name,
    //   password: password,
    // });
    const allReg = await AdminReg.find({});
    console.log(allReg);

    return new Response(JSON.stringify(allReg), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to Fetch ", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { _id } = await request.json();

  try {
    await connectDB();

    const existingPrompt = await AdminReg.findById(_id); //looking for a prompt with specific id

    if (!existingPrompt)
      return new Response("Admin not found", { status: 404 }); // checking prompt exists or not

    existingPrompt.approved = true;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update admin", { status: 500 });
  }
};
