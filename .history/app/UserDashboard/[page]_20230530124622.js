"use client";
import { useRouter } from "next/router";

export default function UserDashboard() {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
}
