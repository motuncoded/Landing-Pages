import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<null | { email: string }>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>You are not signed in</p>
      )}
    </div>
  );
};

export default Dashboard;
