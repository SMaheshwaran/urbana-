"use client";

import LoginForm from "@/Components/AdminLogin";

export default function AdminLogin() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoginForm what="staff" />
    </div>
  );
}
