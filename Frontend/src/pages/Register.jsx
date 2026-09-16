import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [userName, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          email,
          userName,
          password,
          role: "user",
        },
      );

      navigate("/dashboard");
    } catch (error) {
      console.log("error in handle submit", error);
      console.log(error.response);
    }
  };

  return (
    <>
      <main>
        <div className="relative h-screen w-screen flex justify-center  ">
          <img src="/loginbg.webp" className="h-full w-full " />
        </div>

        <div className=" bg-linear-to-r  from-[#93cc9bf0] to-[#ddf0ec]  h-[65vh] w-[40vw] rounded-xl shadow-lg shadow-[#676666] p-10 w-full max-w-md absolute inset-0 h-[60vh] w-[40%] m-auto ">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Spotify
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Register to continue your journey
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#547d08]"
              required
            />
            <input
              type="text"
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

            <input
              type="text"
              name="role"
              placeholder="Enter your role"
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#547d08]"
            />

            <button
              type="submit"
              className="w-full bg-[#9ae312] text-black p-3 rounded-md hover:bg-[#639605] transition"
            >
              Signup
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <span className="text-[#33480b] cursor-pointer hover:underline">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
