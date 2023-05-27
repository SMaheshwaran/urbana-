"use client";
import { useState } from "react";
import LoginForm from "@/Components/AdminLogin";
import { useRouter } from "next/navigation";
export default function StaffLogin() {
  const router = useRouter();
  const [reg, setReg] = useState({
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const StaffLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/StaffLogin", {
        method: "POST",
        body: JSON.stringify({
          name: reg.username,
          phoneNumber: reg.password,
        }),
      });

      if (res.ok) {
        console.log("staff login successful");
        router.push("/");
      }

      if (res.status == 409) {
        alert("staff login failed");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoginForm
        reg={reg}
        setReg={setReg}
        submitting={setSubmitting}
        handleSubmit={StaffLogin}
        what="staff"
      />
    </div>
  );
}
