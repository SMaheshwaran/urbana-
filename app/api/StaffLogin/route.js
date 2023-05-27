import { connectDB } from "@/utils/database";
import StaffDetails from "@/models/StaffDetails";

export const POST = async (req, res) => {
  const { name, phoneNumber } = await req.json();
  console.log(name, phoneNumber);

  try {
    await connectDB();

    const existingStaff = await StaffDetails.findOne({ name, phoneNumber });

    if (existingStaff) {
      return new Response("Staff is registered", {
        status: 200,
      });
    } else {
      return new Response("Staff is not registered", {
        status: 409,
      });
    }
  } catch (error) {
    return new Response("failed to add staff", { status: 500 });
  }
};
