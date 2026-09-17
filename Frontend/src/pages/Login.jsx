import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://spotify-vclb.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log("response data : ", response.data);
      const user = response.data.user.userName 
      const role = response.data.user.role 
     
          
      sessionStorage.setItem("userName",user)
      sessionStorage.setItem("role",role)

      {if(role == "user"){
        naviagte("/dashboard")
      }else{
        naviagte("/artistDashboard")
      }}
      
    } catch (error) {
      console.log("axios error : ", error);
    }
  };

  return (
    <>
      <main>
        <div className="relative h-screen w-screen flex justify-center  ">
          <img src="/loginbg.webp" className="h-full w-full " />
        </div>

        <div className=" bg-linear-to-r  from-[#93cc9bf0] to-[#ddf0ec]  h-[60vh] w-[40vw] rounded-xl shadow-lg shadow-[#676666] p-10 w-full max-w-md absolute inset-0 h-[60vh] w-[40%] m-auto ">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Spotify
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Login to continue your journey
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#547d08]"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#547d08]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#9ae312] text-black p-3 rounded-md hover:bg-[#639605] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            Don’t have an account?{" "}
            <span className="text-[#33480b] cursor-pointer hover:underline">
              <Link to={"/signup"}>Register</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
