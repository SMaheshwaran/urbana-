"use client";

import LoginForm from "@/Components/AdminLogin";
import { useState } from "react";
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
      const res = await fetch("/api/UserLogin", {
        method: "POST",
        body: JSON.stringify(reg),
      });
      if (res.status == 201) {
        console.log("okay");

        router.push("/UserDashboard");
      }
      if (res.status == 409) {
        alert("Not yet approved by the admin");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoginForm
        reg={reg}
        setReg={setReg}
        submitting={setSubmitting}
        handleSubmit={registerAdmin}
        what="user"
      />
    </div>
  );
}
