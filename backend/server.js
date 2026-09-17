import './env.js';
import express from "express";
import cors from "cors";
import dbConnection from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import musicRoutes from "./routes/music.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5174",
  "https://spotify-six-self.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

dbConnection();

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server is running on the port ${port}`);
});
