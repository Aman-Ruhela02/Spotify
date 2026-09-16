import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function UserDashboard() {
  const [allmusic, setAllmusic] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [active,setActive] = useState(null)
  const audioRef = useRef(null);

  async function getAllMusic() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/music/getAllMusic",
        {
          withCredentials: true,
        },
      );

      const allmusic = response.data.music;
      setAllmusic(allmusic);
      if (allmusic.length > 0) {
        setCurrentMusic(allmusic[0]);
      }
    } catch (error) {
      console.log("music fetch error:", error);
    }
  }

  useEffect(() => {
    getAllMusic();
  }, []);

  useEffect(() => {
    if (!currentMusic || !audioRef.current) return;

    audioRef.current.play().catch((error) => {
      console.log("Autoplay blocked:", error);
    });
  }, [currentMusic]);

  function start(item) {
    setActive(item._id)
    setCurrentMusic(item);
  }

  const userName = sessionStorage.getItem("userName");

  return (
    <>
      <nav className="bg-[#D0DE01] flex justify-between px-5 h-[8vh] items-center ">
        <div className="left">
          <h3 className="text-xl font-medium  ">Hii, {userName} </h3>
        </div>

        <div className="right flex gap-10">
          <h3 className="border-2 rounded-2xl px-2 font-medium">All music</h3>
          <h3 className="border-2 rounded-2xl px-2 font-medium">Album</h3>
        </div>
      </nav>
      <main className="hidden md:flex h-[92vh] bg-[#1f1f1f] ">
        <div className="left flex items-center justify-center h-[90vh] w-[65vw] ">
          <div className="box h-[60vh] w-[50vw] border-2 p-2 border-[#D0DE01] rounded-2xl shadow-2xl shadow-[#D0DE01]  ">
            {allmusic.map((item) => (
              <div key={item._id} className="list flex ">
                <button
                  onClick={() => start(item)}
                  className={` my-2 p-2  rounded-2xl capitalize text-xl font-medium font-sans 
                    ${ active === item._id ? "bg-[#cfde01ce] w-[60%] ": "bg-[#f2f0f0] w-[90%]" }`}
                >
                  {item.title}
                </button>
                 {active === item._id ? <img width="150px"  src="../../public/agp_studios-audio-22816_512.gif"></img>: "" }
              </div>
            ))}
          </div>
        </div>

        <div className="right flex items-center justify-center h-[90vh] w-[35vw] ">
          <div className=" flex flex-col justify-center items-center h-[60vh] w-[25vw]">
            <img src="/music-disc.png" alt="" />
            {currentMusic && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4 capitalize">{currentMusic.title}</h2>
              </div>
            )}
          </div>
        </div>
      </main>

      <main className="md:hidden flex bg-[#1f1f1f]  py-10 items-center justify-center">
        <div className="border-2 p-2 border-[#D0DE01] rounded-2xl shadow-2xl shadow-[#D0DE01]  flex flex-col justify-between  h-[80vh] w-[80vw]">
          <div className="box">
            {allmusic.map((item) => (
              <div key={item._id} className="list flex justify-center ">
                <button
                  onClick={() => start(item)}
                  className={` my-2 p-2  rounded-2xl capitalize text-xl font-medium font-sans 
                    ${ active === item._id ? "bg-[#cfde01ce] w-[60%] ": "bg-[#f2f0f0] w-[90%]" }`}
                >
                  {item.title}
                </button>
                {active === item._id ? <img width="130px" src="../../public/agp_studios-audio-22816_512.gif"></img>: "" }
              </div>
            ))}
          </div>

          <div className=" flex  justify-between items-center ">
            <img src="/music-disc.png" height="100px" width="150px" alt="" />
            <h2 className=" capitalize absolute left-77 bottom-33 text-xl font-bold text-white  ">...</h2>
            
          </div>
        </div>
      </main>
      {currentMusic && (
  <div
    className="
      fixed
      z-50

      bottom-[60px]
      left-[60%]
      -translate-x-1/2

      md:bottom-[130px]
      md:right-[7vw]
      md:left-auto
      md:translate-x-0
    "
  >
    <audio
      ref={audioRef}
      src={currentMusic.uri}
      controls
    />
  </div>
)}
    </>
  );
}

export default UserDashboard;
