"use client";
import { useState } from "react";
import LoginFormForAdmin from "@/Components/LoginForAdmin";
import { useRouter } from "next/navigation";
export default function AdminLogin() {
  const router = useRouter();
  const [reg, setReg] = useState({
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const registerAdmin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/AdminLogin", {
        method: "POST",
        body: JSON.stringify({
          username: reg.username,
          password: reg.password,
        }),
      });
      if (res.ok) {
        console.log("Approved and signed In");
        router.push("/AdminDashboard");
      }
      if (res.status == 409) {
        alert("Not yet approved");
      }
      if (res.status == 408) {
        alert("Credentials not valid");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoginFormForAdmin
        reg={reg}
        setReg={setReg}
        submitting={setSubmitting}
        handleSubmit={registerAdmin}
        what="admin"
      />
    </div>
  );
}
