import {useState} from "react";


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
const [userData, setUserData] = useState({
    fullname: "",   
    username: "",
    email: "",
    password: ""
});
const [message, setMessage] = useState("");

const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({   

        ...prevState,
        [id]: value
    }));
}   

const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
}   

const handleSubmit = (e) =>{
e.preventDefault();
setMessage("Sign up successfully");

setTimeout(() => {
    setMessage("");
}, 3000);

localStorage.setItem("userData", JSON.stringify(userData));
const storedData = JSON.parse(localStorage.getItem("userData"));

if(userData.email === storedData.email){
    setTimeout(() => {
        setMessage("");
    }   , 3000);
    setMessage("User already exists");
}
setUserData({
    fullname: "",   
    username: "",
    email: "",
    password: ""        
})


}

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Create your Account</h2>

      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit} id="signUpForm">
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

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
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2 ">
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
            <button type="button" onClick={handleShowPassword} className="ml-2">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/closed-eye--v1.png" alt="eye-icon" className="w-5 h-5 cursor-pointer"/>
          </button>) : ( 
            <button type="button" onClick={handleShowPassword} className="ml-2">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png" alt="eye-icon" className="w-5 h-5 cursor-pointer"/>
          </button>)}</div>
          
        </div>

        <div className="flex flex-col justify-center items-center">
            {message && <p className="text-gray-800 mb-2">{message}</p>}

          <button
            type="submit"
            className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </div>

        {/* Redirect */}
        <div className="text-center mt-4">
          <p className="ml-2">
            Already have an account?{" "}
            <a href="/signin" className="underline text-black-500">
              Sign in
            </a>
          </p>
        </div>
      </form>

   
    </div>
  );
};

export default Signup;
