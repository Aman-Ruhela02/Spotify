import jwt from "jsonwebtoken";

export async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unautherised access" });
  }

  try {
  
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "You don't have access" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

export async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Login first to get your vibe" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(401).json({ message: "Unautherised access" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("auth middleware error :", error);
  }
}

export async function artistId(req,res,next){
  const token = req.cookies.token 

  if(!token){
    return res.status("Unautherised access")
  }

  try {
     const decoded = await jwt.verify(token,process.env.JWT_SECRET)

     const Id = decoded._id 
     req.user = decoded
     next()
  } catch (error) {
    
  }
 
}
