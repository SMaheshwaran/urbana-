"use client";

import LoginForm from "@/Components/AdminLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SuperAdminLogin() {
  const router = useRouter();
  const [reg, setReg] = useState({
    name: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const registerAdmin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/SuperAdminLogin", {
        method: "POST",
        body: JSON.stringify({
          name: reg.name,
          password: reg.password,
        }),
      });
      if (res.ok) {
        console.log("okay");

        router.push("/SuperAdminDashboard");
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
        what="SuperAdmin"
      />
    </div>
  );
}
