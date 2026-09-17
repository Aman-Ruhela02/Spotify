import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function ArtistDashboard() {
  const [allMusic, setAllMusic] = useState([])
  const [musicUpload, setMusicUpload] = useState("");
  const [title, setTitle] = useState("");
 
  const upload = async (e) => {
    e.preventDefault();
    if (!musicUpload || ! title) {
      alert("All fields are required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("music", musicUpload);
      formData.append("title", title);
      const response = await axios.post(
        "https://spotify-vclb.onrender.com/api/music/createmusic",
          formData,
        {
          withCredentials: true,
        },
      );
           
      console.log("response:-", response);
      alert("music uploaded");
      getMyMusic()
    } catch (error) {
      alert("error", error);
      console.error("error in upload:", error);
    }
  };

  
  const getMyMusic = async()=>{
    try {
      const response = await axios.get("https://spotify-vclb.onrender.com/api/music/getartistmusic",{
        withCredentials:true 
      })

      const allmusic = response.data.music 
      console.log("all music",allmusic);
      setAllMusic(allmusic)
      
    } catch (error) {
      console.log("error in fetching music : ",error);
    }
  }

  useEffect(()=>{
    getMyMusic()
  },[])

  const name = sessionStorage.getItem("userName")
  

  return (
    <>
      <nav className="bg-[#D0DE01] h-[8vh] flex justify-between items-center px-4 ">
        <div className="left">
          <h2 className="text-2xl font-medium capitalize ">Hii, {name}</h2>
        </div>
        <div className="right flex gap-10">
          <button className="border-3 border-black rounded-2xl px-3 py-2 font-medium">Add music</button>
          <button className="border-3 border-black rounded-2xl px-3 py-2 font-medium">Your music</button>
        </div>
      </nav>

      <main className="bg-[#474646] h-[92vh] w-screen sm:flex sm:flex-row flex flex-col justify-center items-center ">
        <div className="upload h-[65vh] bg-[#292626] sm:h-[80vh] sm:w-[50%] w-[80%] flex flex-col gap-8 items-center justify-center  m-5 rounded-xl  ">
          <input
            type="file"
            accept="audio/mpeg, audio/mp3, .mp3"
            className="border-2 rounded-2xl px-3 border-black hover:cursor-pointer bg-[#cfde01d2] py-20 text-xl font-medium text-black  "
            placeholder="Upload Music"
            onChange={(e) => setMusicUpload(e.target.files[0])}
            required
          />
          <input
            type="text"
            className="bg-white border-none font-black px-3 py-2 rounded-2xl"
            placeholder="Enter song name"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button
            className="bg-[black] rounded-2xl px-6 py-2 text-xl font-medium text-white hover:cursor-pointer  "
            onClick={upload}
          >
            Upload
          </button>
        </div>
        <div className="list  h-[35vh] sm:h-[80vh] sm:w-[50%] w-[80%] ">
          {allMusic.map((items)=>(
            <div key={items.id}>
              <h2 className="bg-[#cfde01d2] my-3 mx-3 rounded-2xl flex justify-center items-center capitalize text-xl font-medium hover:mx-20">{items.title}</h2>
            </div>
            
          ))}
        </div>
      </main>
    </>
  );
}

export default ArtistDashboard;
