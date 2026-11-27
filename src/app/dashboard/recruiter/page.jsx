"use client";
import { useSession } from "@/app/api/auth/[...all]/auth-client";
import DashboardStats from "@/components/dashboard/DashBoardStats";

function RecruiterDashboardHomePage() {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  console.log("Session Data in RecruiterDashboardHomePage", session);
  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome Back,{user?.name}</h2>
      <DashboardStats />
    </div>
  );
}

export default RecruiterDashboardHomePage;
