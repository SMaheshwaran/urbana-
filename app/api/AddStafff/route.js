import { connectDB } from "@/utils/database";

import StaffDetails from "@/models/StaffDetails";

export const POST = async (req, res) => {
  const { name, phoneNumber, role, bloodGroup, emergencyContactNumber } =
    await req.json();
  console.log(name, phoneNumber, role, bloodGroup, emergencyContactNumber);

  try {
    await connectDB();
    const existingStaff = await StaffDetails.findOne({ name, phoneNumber });
    if (existingStaff) {
      // Username already exists, return an appropriate response
      return new Response("Staff already exists", {
        status: 409,
      });
      // return res.status(409).json({ message: 'Username already exists' });
    }

    const staff = new StaffDetails({
      name,
      phoneNumber,
      role,
      bloodGroup,
      emergencyContactNumber,
    });
    await staff.save();
    console.log(staff);
    return new Response(JSON.stringify(staff), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to add staff", { status: 500 });
  }
};

// export const GET = async (req, res) => {

// }
