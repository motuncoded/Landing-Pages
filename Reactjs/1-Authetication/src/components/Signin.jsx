import React, { useState } from "react";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (!storedData) {
      setMessage("user does not exist, please sign up");
      return;
    }

    if (
      userData.email !== storedData.email ||
      userData.password !== storedData.password
    ) {
      setMessage("User details are wrong, please check again");
      return;
    }

    setMessage("Signin successfully");
    window.location.href = "/dashboard";
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen bg-gray-100">
      <div>{message && <p className="text-gray-800 mb-2">{message}</p>}</div>

      <h2 className="text-2xl font-bold mb-4">Access your Account</h2>

      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
        id="signUpForm"
      >
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2 "
          >
            Password
          </label>
          <div className="flex items-center border rounded p-2 focus-within:border-gray-900 focus-within:border-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
            {showPassword ? (
              <button
                type="button"
                onClick={handleShowPassword}
                className="ml-2"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/closed-eye--v1.png"
                  alt="eye-icon"
                  className="w-5 h-5 cursor-pointer"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowPassword}
                className="ml-2"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png"
                  alt="eye-icon"
                  className="w-5 h-5 cursor-pointer"
                />
              </button>
            )}
          </div>
        </div>

        <div>
          <a
            href="/forgot-password"
            className="text-sm text-gray-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Signin
          </button>
        </div>

        {/* Redirect */}
        <div className="text-center mt-4">
          <p className="ml-2">
            Already have an account?{" "}
            <a href="/" className="underline text-black-500">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
