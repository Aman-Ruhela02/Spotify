import './env.js';
import express from "express";
import cors from "cors";
import dbConnection from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import musicRoutes from "./routes/music.routes.js";

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://spotify-six-self.vercel.app",
    ],
    credentials: true,
 
  })
);



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  })
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try{
    await dbConnection();
    app.listen(port, () => {
      console.log(`Server is running on the port ${port}`);
    });
  }catch(error){
    process.exit(1);
  }
}
startServer();