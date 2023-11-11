import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data;

        // Verify token to get user details
        const tokenVerification = await axios.get(
          `http://localhost:8080/api/users/validateToken/${token}`
        );

        if (
          tokenVerification.data.Token === "valid" &&
          tokenVerification.data.Role === "ADMIN"
        ) {
          // Storing the token in local storage
          console.log("admin");
          localStorage.setItem("adminToken", token);

          navigate("/");
          window.location.reload(true);

        } else {
          setError("User is not an admin.");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <img src="https://iili.io/Jqq8OLx.png" alt="logo" className="mb-4" />
        <h2 className="text-2xl mb-4 font-bold">Admin Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
