import { connectDB } from "@/utils/database";
import User from "@/models/UserRegiser";
export const POST = async (req, res) => {
  const { username, password } = await req.json();
  console.log(username, password);

  try {
    await connectDB();
    const existingAdmin = await User.findOne({ username, password });
    if (existingAdmin) {
      // Check if the existing admin is approved
      if (existingAdmin.approved) {
        // Username already exists and admin is approved, return an appropriate response
        return new Response(" User is approved", {
          status: 201,
        });
      } else {
        // Username already exists but admin is not approved, return an appropriate response
        return new Response(" User is not approved", {
          status: 409,
        });
      }
    } else {
      return new Response(" Username and password doesn't match", {
        status: 408,
      });
    }
  } catch (error) {
    return new Response("failed to login admin", { status: 500 });
  }
};
