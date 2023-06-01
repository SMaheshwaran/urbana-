import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectDB } from "./utils/database";

const options = {
  providers: [
    Providers.Credentials({
      // Define your own login form and logic
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement your login logic here
        const { username, password, collection } = credentials;
        const db = await connectDB();
        const users = db.collection(collection);
        const user = await users.findOne({ username });

        if (user && user.password === password) {
          return { id: user._id, username: user.username };
        }

        return null;
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
