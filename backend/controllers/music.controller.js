// import dotenv from "dotenv";
// dotenv.config({path: '.env.dev'});
import musicModel from "../model/music.model.js";
import jwt from "jsonwebtoken";
import uploadFile from "../storage/storage.service.js";
import albumModel from "../model/album.model.js";

export async function createMusic(req, res) {
  console.log("someone is hitting the requrest");
  console.log("body",req.body);
  console.log("file",req.file);
  console.log("files",req.files);


  const { title } = req.body;
  if(!title || !req.file){
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    })
  };
  const file = req.file;
  console.log(file);

  const result = await uploadFile(file.buffer.toString("base64"));
  console.log("log result ", result);

  let music;
  try {
    music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });
  } catch (error) {
    console.log("music creation error:", error);
  }

  res.status(201).json({
    message: "music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

export async function createAlbum(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Unautherised access" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded role", decoded.role);

    if (decoded.role !== "artist") {
      return res.status(401).json({ message: "You dont have access to create music" });
    }
    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics,
    });

    res.status(201).json({
      message: "Album  created successfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        music: album.musics,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllMusic(req, res) {
  try {
    const allMusic = await musicModel.find().limit(10);
    res.status(200).json({ message: "Music fetched successfully", music: allMusic });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

export async function getArtistMusic(req,res){
  const token = req.cookies.token 
  console.log("getartist music token",token);

  let Id
  try {
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    Id = decoded.id 
    console.log("user id: ",Id);
    
  } catch (error) {
    return res.status(500).json({message:"error in fetching your music",error})
  }
  
  try {
    const mymusic = await musicModel.find({artist:Id}).limit(10)
    res.status(200).json({message: "Music fetched successfully", music: mymusic})
  } catch (error) {
    return res.status(500).json({message:"music fetch error"})
  }
}
