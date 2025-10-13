import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // uncomment if using React Router

const ForgotPassword = () => {
  // const navigate = useNavigate(); // uncomment if using React Router
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [message, setMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && storedData.email === email) {
      setShowReset(true);
      setSaveMessage("");
    } else {
      setMessage("Email not found. Please sign up first.");
      window.location.href = "/";
      setTimeout(() => setMessage(""), 3000);
      setShowReset(false);
    }
  };

  const handleShowPassword = () => setShowPassword((s) => !s);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  const handleSavePassword = () => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (!storedData) {
      setMessage("No user found. Please sign up first.");
      return;
    }

    const updatedData = { ...storedData, password: newPassword };
    localStorage.setItem("userData", JSON.stringify(updatedData));

    // show success message
    setSaveMessage("Password reset successfully! Redirecting to Sign In...");

    // hide the reset inputs (so UI is tidy) but keep the saveMessage visible
    setShowReset(false);
    setNewPassword("");

    // Delay redirect so message is visible
    setTimeout(() => {
      setMessage("");
      window.location.href = "/signin";
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      {/* top messages */}
      {message && <p className="text-gray-800 mb-2">{message}</p>}
      {saveMessage && (
        <p className="text-green-600 mb-2 font-semibold">{saveMessage}</p>
      )}

      {/* Step 1: Enter Email */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mb-4"
      >
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
          className="w-full p-2 border rounded"
          required
        />

        {showReset && (
          <p className="text-green-600 mt-2">
            Email verified! Please reset your password below.
          </p>
        )}

        <button
          type="submit"
          className={`font-bold py-2 px-4 rounded mt-4 text-white ${showReset ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-700"}`}
          disabled={showReset}
        >
          Verify Email
        </button>
      </form>

      {/* Step 2: Reset Password */}
      {showReset && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            New Password
          </label>
          <div className="flex items-center border rounded p-2 focus-within:border-gray-900">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full outline-none"
              required
            />
            <button type="button" onClick={handleShowPassword} className="ml-2">
              <img
                src={
                  showPassword
                    ? "https://img.icons8.com/ios-glyphs/30/000000/closed-eye--v1.png"
                    : "https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png"
                }
                alt="eye-icon"
                className="w-5 h-5 cursor-pointer"
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSavePassword}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Save New Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
