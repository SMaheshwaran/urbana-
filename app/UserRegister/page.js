"use client";
import UserRegisterForm from "@/Components/UserRegisterForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRegister() {
  const router = useRouter();
  const [reg, setReg] = useState({
    name: "",
    apartment: "",
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const registerAdmin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/UserRegister", {
        method: "POST",
        body: JSON.stringify({
          name: reg.name,
          apartment: reg.apartment,
          username: reg.username,
          password: reg.password,
        }),
      });
      if (res.ok) {
        console.log("okay");
        router.push("/UserLogin");
      }
      if (res.status == 409) {
        alert("username already in use, try different one");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <UserRegisterForm
        reg={reg}
        setReg={setReg}
        submitting={setSubmitting}
        handleSubmit={registerAdmin}
        what="User"
      />
    </div>
  );
}
