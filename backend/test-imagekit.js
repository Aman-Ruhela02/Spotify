import ImageKit from "@imagekit/nodejs/index.js";
import dotenv from "dotenv";
dotenv.config({path: '.env.dev'});

console.log("=== ImageKit Setup Test ===\n");

// 1. Check env variables
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

console.log(
  "IMAGEKIT_PRIVATE_KEY  :",
  privateKey ? "✅ loaded" : "NOT FOUND",
);
console.log(
  "IMAGEKIT_PUBLIC_KEY   :",
  publicKey ? "✅ loaded" : "NOT FOUND",
);
console.log(
  "IMAGEKIT_URL_ENDPOINT :",
  urlEndpoint ? `✅ ${urlEndpoint}` : "NOT FOUND",
);
console.log();

if (!privateKey || !publicKey || !urlEndpoint) {
  console.error("Missing required ImageKit config — cannot proceed.");
  process.exit(1);
}

// 2. Initialize client
const client = new ImageKit({
  privateKey,
  publicKey,
  urlEndpoint,
});

console.log("ImageKit client created\n");

// 3. Upload a small test file
const testContent = Buffer.from("Hello from Spotify Backend test!").toString(
  "base64",
);

console.log("Uploading test file...\n");

try {
  const result = await client.files.upload({
    file: testContent,
    fileName: "test_upload_" + Date.now() + ".txt",
    folder: "test",
  });

  console.log("Upload SUCCESS!\n");
  console.log("File ID  :", result.fileId);
  console.log("File Name:", result.name);
  console.log("File URL :", result.url);
  console.log("File Size:", result.size, "bytes");
} catch (error) {
  console.error("Upload FAILED!\n");
  console.error("Error:", error.message || error);
  if (error.status) console.error("Status:", error.status);
}
