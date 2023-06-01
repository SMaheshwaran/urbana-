import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./Auth";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "../Components/Navbar";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <> <AuthContext.Provider value={{ user, login, logout, isAdmin, isSuperAdmin }}>
      <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
    </AuthContext.Provider>
    </>
  );
}
