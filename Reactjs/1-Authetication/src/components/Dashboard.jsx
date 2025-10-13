import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const loggedUser = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      window.location.href = "/signin";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/signin";
  };
  return (
    <div>
      {" "}
      {user ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h2 className="text-3xl font-semibold">Welcome, {user.fullname}</h2>
          <div>
            <p className="text-lg mt-2">Username: {user.username}</p>
            <p className="text-lg mt-2">Email: {user.email}</p>
          </div>
          <button
            className="mt-4 bg-gray-900 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
