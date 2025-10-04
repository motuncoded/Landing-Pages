import { useState } from "react";
import { useRouter } from "next/router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

const handleSignin = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token); // Save token
    router.push("/dashboard");
  } else {
    alert(data.message);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignin} className="flex flex-col gap-4 w-64">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
