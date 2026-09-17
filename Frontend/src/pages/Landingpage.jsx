import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router";
import {motion} from 'framer-motion'

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Landingpage = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const elementRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".animate-text", {
        opacity: 0,
        y: 20,
        rotationX: 90,
        stagger: 0.05,
        duration: 1.2,
        ease: "back-out(1.7)",
      });
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    gsap.utils.toArray(".logo").forEach((logo) => {
      gsap.to(logo, {
        x: `random(-80,80)`,
        y: `random(-50,50)`,
        rotation: `random(-30,30)`,
        duration: "random(3,6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  });

  return (
    <>
    <main className="overflow-x-hidden">

    
      <section className="relative h-screen  ">
        <img src="1373278.jpg" className="h-full w-full object-cover" alt="" />

        <div className="absolute inset-0 ">
          <nav className="flex h-[10vh] w-full justify-between pl-15 pr-5 pt-2.5">
            <div className="logo flex">
              <div className="logo h-22.5 w-22.5  ">
                {" "}
                <img
                  className="object-cover h-full w-full "
                  src="/logo.png"
                  alt=""
                />{" "}
              </div>{" "}
              <p className="text-2xl font-bold text-[#2c2727] mt-6   ">
                Spotify
              </p>{" "}
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-3">
              <span className="border-2  sm:mx-5 font-medium rounded-2xl text-xl px-3  py-1">
                {" "}
                <Link to="/login">Login</Link>{" "}
              </span>
              <span className="border-2 sm:mx-5 font-medium rounded-2xl text-xl px-3  py-1">
                <Link to="/signup">Signup</Link>
              </span>
            </div>
          </nav>
          <div
            ref={containerRef}
            className="  flex items-center justify-center mt-[23vh] w-full mask-linear-from-inherit "
          >
            <h1 className="animate-text text-7xl  mr-[45vw]  text-center font-bold font-sans ">
              Get Your <br />
              <h1 ref={textRef}>Vibe</h1>{" "}
            </h1>
          </div>
        </div>
      </section>

       <section className="bg-[#353333] min-h-screen   sm:flex justify-between ">
        <div className="left text-white  pt-20 sm:pt-30 pl-4 sm:pl-20">
          <motion.h1 
          animate={{
            x:3
          }}
          initial={{
            x:-7,
           
          }}

          transition={{
            duration:1 
          }}
          className="text-7xl font-bold">One app for</motion.h1>
          <h1 className="text-7xl font-bold">all your sounds</h1>
          <p className="text-xl font-bold pt-10">With <span className="text-[#D0DE01]">Spotify</span>, you can play millions of songs</p>
          <p className="text-xl font-bold ">for free. Listen to the songs you love and find</p>
          <p className="text-xl font-bold ">music from all over the world</p>
          <button className="bg-[#D0DE01] rounded-2xl px-3  mt-10 text-black font-medium text-[17px] hover:cursor-pointer">Download Spotify</button>
        </div>
        <div className="right pt-10 sm:pt-20">
          <img src="/mxj_files-dancing-22475_512.gif" alt="" />
        </div>
      </section>

      <section
        // ref={sectionRef}
        className="relative flex h-[100vh] "
      >
        <div className="left  absolute mt-10 ml-5 sm:mt-15 sm:ml-20 ">
          <div>
          <h2 className="text-[#D0DE01] text-7xl font-extrabold sm:text-7xl ">Connection</h2>
          <h2 className="text-[#D0DE01] text-7xl font-extrabold  sm:text-7xl">Through Music</h2>
          <p className="text-black mt-10 font-medium text-2xl font-serif  ">As the world’s music hub, Spotify is where fans and <br /> artists come together.</p>
          </div>

          <div>
            <div>
              <h2></h2>
              <p className="text-black mt-4 font-medium text-xl font-serif ">It’s the place to discover the perfect song for the moment. <br /> The place that brings music to your whole life.</p>
              <p></p>
            </div>
            <div className="flex flex-col mt-10 ">
             <span> <button className="bg-[#43ca05] rounded-2xl px-3 py-1 font-medium">Get 12 months at $99</button></span>
              <span><button className="border-2 rounded-2xl mt-5 ml-5 px-4 font-medium">View all plans</button></span>
            </div>
          </div>
        </div>

        
        <div className="right object-cover h-full w-full  ">
            <img className="object-cover h-full w-full sm:w-full sm:h-full" src="/Gemini_Generated_Image_givkycgivkycgivk.png" />
        </div>
        
        

        <div
          ref={elementRef}
          className="grid grid-cols-6 absolute inset-0 h-[10vh] w-full px-2 "
        >
          <div className="logo h-27.5 w-27.5 m-2 ">
            {" "}
            <img
              className="object-cover h-full w-full "
              src="/pngegg.png"
              alt=""
            />{" "}
          </div>
         
        </div> 
      </section>

      <section className="bg-[#353333] h-[90vh]">
      <div className="left">
        <div className=" pt-5 pl-4 sm:pl-30"><img src="/spotify-logo (1).png" alt="Spotify" width="100px" /></div>
        <div className="flex gap-8 justify-between mx-4 mt-4 sm:mx-30 sm:mt-10 text-[#dcd9d9da] font-medium ">
          <div>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>
          </div>

          <div>
            <p>For Artists</p>
            <p>Developers</p>
            <p>Advertising</p>
            <p>Vendors</p>
            <p>Investors</p>
          </div>

          <div>
            <p>Support</p>
            <p>Web Player</p>
            <p>Free Mobile App</p>
          </div>
        </div>
      </div>
      <div className="right">
        <div className=" flex mx-7 mt-15 sm:mx-28 text-white font-medium"><span><img src="/earth.png" alt="" width="40px" /></span><p className="mt-2 text-[#dcd9d9da] ">Denmark</p></div>
        <div className="flex justify-between mx-10 mt-5 sm:mx-30 sm:mt-5  text-[#dcd9d9da] font-medium">
          <div>
            <p>Legal</p>
            <p>Privacy Center</p>
            <p>Privacy Policy</p>
            <p>Cookies</p>
            <p>About Ads</p>
          </div>
          <div>
            <p><img src="/instagram_logo_transparent.png" width="40px" alt="" /></p>
            <p><img className="mt-2" src="/instagram_logo_transparent.png" width="40px"  alt="" /></p>
            <p><img className="mt-2" src="/instagram_logo_transparent.png" width="40px" alt="" /></p>
          </div>
        </div>
      </div>
      </section>
     </main>
    </>
  );
};

export default Landingpage;
