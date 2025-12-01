import React, { useState, useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  const contentSectionRef = useRef(null);
  const downloadSectionRef = useRef(null);

  const scrollToContent = () => {
    if (contentSectionRef.current) {
      const offset = contentSectionRef.current.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const scrollToDownload = () => {
    if (downloadSectionRef.current) {
      const offset = downloadSectionRef.current.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.0,
      x: "-50%",
      y: "-50%",
      bottom: "auto",
      top: "50%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
      transformOrigin: "center center",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");
    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      const yMove = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
      gsap.to(".character", {
        x: `calc(-50% + ${xMove * 0.25}px)`,
        y: `calc(-50% + ${yMove * 0.3}px)`,
        duration: 0.5,
        ease: "Power2.easeOut",
      });
    };

    main.addEventListener("mousemove", handleMouseMove);

    return () => {
      main.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[12rem] leading-none ml-20">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[1.8] rotate-[-20deg] object-contain max-h-[75vh] w-auto z-[5] pointer-events-none"
                src="./girlbg.png"
                alt="Character"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.6))' }}
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent z-20">
              <button
                onClick={scrollToContent}
                className="flex gap-4 items-center cursor-pointer hover:opacity-80 transition-opacity duration-300 group"
              >
                <i className="text-4xl ri-arrow-down-line group-hover:translate-y-2 transition-transform duration-300"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </button>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div ref={contentSectionRef} className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg relative w-[30%] py-30 px-8 rounded-2xl glass-effect overflow-hidden flex flex-col items-center justify-center">
                <h1 className="text-8xl drop-shadow-2xl font-bold text-glow text-center">Still Running,</h1>
                <h1 className="text-8xl drop-shadow-2xl font-bold text-glow text-center">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display] leading-relaxed text-white/90 text-center">
                  Welcome to Vice City, where every street tells a story and every corner hides an opportunity. Experience the ultimate open-world adventure as you navigate through a sprawling metropolis filled with endless possibilities, from high-speed chases to strategic heists.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display] leading-relaxed text-white/90 text-center">
                  Build your criminal empire from the ground up. Recruit crew members, complete daring missions, and rise through the ranks. The city is your playground—take what you want, when you want. Just remember: in this game, there are no second chances.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display] leading-relaxed text-white/90 text-center">
                  With cutting-edge graphics, immersive gameplay, and a dynamic world that reacts to your every move, Grand Theft Auto VI redefines what's possible in open-world gaming. Are you ready to write your legend?
                </p>
                <button
                  onClick={scrollToDownload}
                  className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 px-10 py-10 text-black mt-10 text-4xl rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 font-bold mx-auto"
                >
                  Download Now
                </button>
              </div>
            </div>
          </div>
          <DownloadSection ref={downloadSectionRef} />
        </div>
      )}
    </>
  );
}

const DownloadSection = forwardRef((props, sectionRef) => {
  useGSAP(() => {
    if (!sectionRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const character = entry.target.querySelector(".download-character");
            const text = entry.target.querySelector(".download-text");
            const bg = entry.target.querySelector(".download-bg");

            if (character) {
              gsap.fromTo(
                character,
                {
                  scale: 1.8,
                  rotate: -20,
                  opacity: 0,
                  y: 150,
                  filter: "blur(10px)",
                },
                {
                  scale: 1.15,
                  rotate: 0,
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 2,
                  ease: "Expo.easeOut",
                }
              );
            }

            if (text) {
              gsap.fromTo(
                text,
                {
                  opacity: 0,
                  y: 50,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.2,
                  delay: 0.3,
                  ease: "Power3.easeOut",
                }
              );
            }

            if (bg) {
              gsap.fromTo(
                bg,
                {
                  scale: 1.3,
                  opacity: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 2,
                  ease: "Power2.easeOut",
                }
              );
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef?.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  });

  useGSAP(() => {
    const downloadSection = sectionRef?.current;
    if (!downloadSection) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      const yMove = (e.clientY / window.innerHeight - 0.5) * 30;
      const character = downloadSection.querySelector(".download-character");
      const bg = downloadSection.querySelector(".download-bg");
      const wrapper = downloadSection.querySelector(".download-character-wrapper");

      if (character) {
        gsap.to(character, {
          x: `${xMove * 0.3}px`,
          y: `${yMove * 0.3}px`,
          scale: 1.15 + (Math.abs(yMove) / 1000),
          duration: 1,
          ease: "Power2.easeOut",
        });
      }

      if (wrapper) {
        const glowIntensity = Math.abs(xMove) / 50;
        gsap.to(wrapper, {
          filter: `brightness(${1 + glowIntensity * 0.1})`,
          duration: 0.5,
        });
      }

      if (bg) {
        gsap.to(bg, {
          x: `${xMove * 0.6}px`,
          duration: 0.8,
          ease: "Power2.easeOut",
        });
      }
    };

    downloadSection.addEventListener("mousemove", handleMouseMove);

    return () => {
      downloadSection.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <div
      ref={sectionRef}
      className="download-section relative overflow-hidden w-full h-screen bg-gradient-to-b from-black via-purple-900/30 via-pink-900/25 to-orange-900/20"
    >
      <div className="absolute inset-0 download-bg opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/15 via-purple-600/15 via-orange-500/10 to-yellow-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/5 to-purple-500/10"></div>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-10 flex items-end justify-between w-full h-full gap-4">
          <div className="download-character-wrapper relative w-[55%] h-full flex items-end justify-start overflow-visible pl-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl scale-150 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-transparent rounded-full blur-2xl scale-125 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-pink-900/30 z-0"></div>
            <img
              className="download-character relative z-10 w-auto h-[85vh] max-h-[85vh] object-contain object-left-bottom"
              src="./download.png"
              alt="Character"
              style={{
                filter: "drop-shadow(0 40px 80px rgba(255, 105, 180, 0.6)) drop-shadow(0 0 100px rgba(255, 192, 203, 0.4)) brightness(1.05) contrast(1.1) saturate(1.1)",
                maxWidth: "100%",
                objectPosition: "left bottom",
              }}
              onError={(e) => {
                e.target.src = "./imag.png";
                console.warn("Download image not found, using fallback");
              }}
            />
          </div>

          <div className="download-content w-[45%] px-10 flex items-center justify-center h-full">
            <div className="download-text glass-effect rounded-3xl p-12 max-w-2xl w-full">
              <h2 className="text-6xl font-bold text-white mb-6 text-glow">
                Ready for Action?
              </h2>
              <p className="text-2xl text-white/90 mb-8 leading-relaxed">
                Step into the most immersive open-world experience ever created.
                Every mission, every decision, every moment is yours to control.
              </p>
              <div className="features mb-10 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xl text-white/90">
                    Massive Open World
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xl text-white/90">
                    Stunning Graphics
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xl text-white/90">
                    Epic Storyline
                  </span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-12 py-6 text-3xl font-bold rounded-xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 transition-all duration-300 transform">
                Get It Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DownloadSection.displayName = "DownloadSection";

export default App;
