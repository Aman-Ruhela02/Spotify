import user from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 6 * 60 * 60 * 1000,
  path: '/',
}

const userRegister = async (req, res) => {
  const { userName, email, password, role = "user" } = req.body;

  const existingUser = await user.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exist" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await user.create({
    userName,
    email,
    password: hashPassword,
    role,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.userName,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

const userLogin = async (req, res) => {

  const { userName, email, password } = req.body;

  const User = await user.findOne({
    $or: [{ userName }, { email }],
  });

  if (!User) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, User.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: User._id,
      role: User.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    message: "Login successfully",
    user: {
      id: User._id,
      userName: User.userName,
      email: User.email,
      role: User.role,
    }
  });
};

const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/'
  });
  res.status(200).json({ message: "User logged out sucessfully" });
};

export default { userRegister, userLogin, userLogout };
