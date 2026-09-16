import express from "express";
import {
  createMusic,
  createAlbum,
  getAllMusic,
  getArtistMusic,
} from "../controllers/music.controller.js";
import { authArtist, authUser } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/createmusic", authArtist, upload.single("music"), createMusic);
router.post("/createAlbum", authArtist, createAlbum);
router.get("/getallmusic", authUser, getAllMusic);
router.get("/getartistmusic",getArtistMusic)

export default router;
