import ImageKit from "@imagekit/nodejs/index.js";
// import dotenv from "dotenv";
// dotenv.config({path: '.env.dev'});

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const result = await client.files.upload({
    file,
    fileName: "music" + Date.now() + ".mp3",
    folder: "music",
  });

  console.log(result);
  return result;
}

export default uploadFile;
