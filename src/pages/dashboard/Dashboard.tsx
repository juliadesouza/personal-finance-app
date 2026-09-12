import { useEffect } from "react";
import { handleRefreshToken } from "@/services/auth";

export default function Dashboard() {
  useEffect(() => {
    const call = async () => await handleRefreshToken();
    call();
  }, []);

  return <div>Dashboard</div>;
}
