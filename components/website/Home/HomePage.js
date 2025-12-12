"use client";
import Navbar from "@/components/navbar/header/Navbar";
import PrimaryButton from "@/components/Uicomponents/PrimaryButton";
import SecondaryButton from "@/components/Uicomponents/SecondaryButton";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Star from "../../assets/images/Star.svg";
import star1 from "../../assets/images/star1.svg";
import Pic from "../../assets/images/Group7.png";
import Iphone from "../../assets/images/iPhone 15.svg";
import MacBook from "../../assets/images/MacBook.svg";
import brochure from "../../assets/make.pdf";
import dhruv from "../../assets/images/dhruv.png";
import sayaji from "../../assets/images/sayaji.png";
import "../../Uicomponents/UiStyles.css";
import dynamic from "next/dynamic";
import MobilePDFPreview from "@/components/FilePreview/PdfView";
import PdfViewer from "@/components/FilePreview/PdfView";
import CenterModal from "@/components/Modal/CenterModal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Carousel from "@/components/Carousel/Carousel";
import Link from "next/link";

const FilePreview = dynamic(() => import("../../FilePreview/FilePreview"), {
  ssr: false,
});

const HomePage = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const starRef = useRef(null);
  const arrowRef = useRef(null);
  const circleRef = useRef(null);
  const spirleRef = useRef(null);
  // Ref to store timeline references
  const timelinesRef = useRef([]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [pdf, setpdf] = useState(
    "https://firebasestorage.googleapis.com/v0/b/massage-2a0f1.appspot.com/o/MakeMyApp%20Portfolio.pdf?alt=media&token=b852ba5b-092f-44a7-86c8-e5ce76d033c4"
  );

  useGSAP(() => {
    // Function to set up animation for a whole SVG
    const setupSvgAnimation = (svgRef, delay = 0) => {
      if (!svgRef.current) return null;
      
      const svg = svgRef.current;
      // Find all paths inside this SVG
      const paths = svg.querySelectorAll('path');
      
      // Make the SVG visible when animation starts
      gsap.set(svg, {
        visibility: "visible"
      });
      
      // Create timeline for this specific SVG
      const tl = gsap.timeline({ paused: true });
      
      // Animate each path within the SVG
      paths.forEach(path => {
        const pathLength = path.getTotalLength();
        
        // Set initial state for the path
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          stroke: path.getAttribute('stroke') || "white",
          fill: "transparent" // Start with no fill
        });
        
        // Add drawing animation for this path
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
        }, delay); // All paths start at the same delay point
        
        // Optionally add fill animation after stroke completes
        tl.to(path, {
          fill: path.getAttribute('data-fill') || "transparent",
          duration: 0.5
        }, ">-0.3"); // Slight overlap
      });
      
      return tl;
    };

    // Create animations for all SVGs with staggered delays
    const timelines = [
      setupSvgAnimation(starRef, 0),
      setupSvgAnimation(circleRef, 2),
      setupSvgAnimation(spirleRef, 4),
      setupSvgAnimation(arrowRef, 6)
    ].filter(Boolean); // Remove any null timelines
    
    // Store timelines for cleanup
    timelinesRef.current = timelines;
    
    // Play all animations
    timelines.forEach(tl => tl.play());
    
    // Cleanup function
    return () => {
      timelinesRef.current.forEach(tl => tl.kill());
    };
  }, []);

  useEffect(() => {
    // macbook animation

    setTimeout(() => {
      gsap.set(".macbook", {
        y: -500,
        opacity: 0,
      });

      gsap.to(".macbook", {
        y: 0,
        opacity: 1,
        duration: 3,
        ease: "power3.out",
      });
    }, 50);
  }, []);

  // Slider
  const SlderData = [
    <div className="w-full text-center md:text-start flex flex-col md:flex-row items-center gap-x-6 text-white mt-[10px]">
      <img
        src={dhruv.src || dhruv}
        className=" h-[100px] w-[100px] md:w-[48px] md:h-[48px] my-5 "
        alt="founder"
      />
      <p className=" w-auto md2:w-[874px] leading-8 font-normal text-[16px]">
        "We’ve built our own digital products, so we know what it takes to
        create apps that actually work. At MakeMyApp, we don’t just code—we
        solve problems. Let’s bring your idea to life!" –{" "}
        <span className="tracking-[3px] text-[12px] font-[900] leading-8 uppercase">
          Dhruv, Founder & CEO
        </span>{" "}
      </p>
      <SecondaryButton
        className="mt-[22px] md:mt-0 min-w-[153px] !px-[16px] "
        text="Reach Out To Me"
        onClick={() => window.open("https://dhruv.qviq.io/", "_blank")}
      />
    </div>,
    <div className="w-full text-center md:text-start flex flex-col md:flex-row items-center gap-x-6 text-white mt-[10px]">
      <img
        src={sayaji.src || sayaji}
        className=" h-[100px] w-[100px] md:w-[48px] md:h-[48px] my-5 "
        alt="co-founder"
      />
      <p className=" w-auto md2:w-[874px] leading-8 font-normal text-[16px]">
        "Tech should empower, not complicate. We build smart, scalable, and
        future proof solutions that help businesses grow. Let’s collaborate and
        create something truly game-changing!" –{" "}
        <span className="tracking-[3px] text-[12px] font-[900] leading-8 uppercase">
          SAYAJI SHIRKE, Co-Founder & CTO
        </span>{" "}
      </p>
      <SecondaryButton
        className="mt-[22px] md:mt-0 min-w-[153px] !px-[16px] "
        text="Reach Out To Me"
        onClick={() => window.open("https://sayaji.qviq.io/", "_blank")}
      />
    </div>,
  ];

  return (
    <>
      <div className="relative w-full">
        <div className="flex items-center gap-[32px] overflow-hidden w-full h-[60px] text-black sticky top-0 z-10 bg-white">
          <div className="flex shrink-0 align-middle justify-between gap-[32px] animate-marquee whitespace-nowrap">
            <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              Big things are coming! Our website is getting a makeover, but
              we're still in full swing, building amazing apps, websites, and
              software. Need a tech partner? We're just a click away!👇
            </p>
            <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              Big things are coming! Our website is getting a makeover, but
              we're still in full swing, building amazing apps, websites, and
              software. Need a tech partner? We're just a click away!👇
            </p>
          </div>
          {/* Duplicate content for seamless looping */}
          <div className="flex shrink-0 align-middle justify-between gap-[32px] animate-marquee whitespace-nowrap">
            <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              Big things are coming! Our website is getting a makeover, but
              we're still in full swing, building amazing apps, websites, and
              software. Need a tech partner? We're just a click away!👇
            </p>
            <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              Big things are coming! Our website is getting a makeover, but
              we're still in full swing, building amazing apps, websites, and
              software. Need a tech partner? We're just a click away!👇
            </p>
          </div>
        </div>
        <Navbar />
        <div className="bg-[linear-gradient(180deg,#000_0%,#666_100%)] h-auto pt-1 md2:pt-[48px] px-5 pb-5 xl:pl-[68px] xle:pl-[135px] xl:pr-[68px]">
          <div className="flex justify-between ">
            <div className="text-white flex flex-col gap-y-6 ">
              <p className=" hidden md:block font-[Epilogue] uppercase tracking-widest ">
                makemyapp
              </p>
              <div className=" items-center md:items-start text-center md:text-start w-full md2:w-[370px] md4:w-[500px] lg2:w-[590px] lg3:w-[690px] min-w-fit flex flex-col gap-y-4  ">
                <h1 className=" text-[52px] md2:text-[32px] md4:text-[52px] lg2:text-[72px] font-[600] md4:font-[700] lg2:font-[800] leading-normal lg:leading-[60px] lg2:leading-[80px] tracking-[-2px] relative">
                  The Best Way to Predict The Future Is To Build It.
                  {windowWidth >= 768 ? (
                    <svg
                    ref={starRef}
                      className="bottom-0 hidden md:flex md:right-[6rem] absolute"
                      xmlns="http://www.w3.org/2000/svg"
                      width="147"
                      height="146"
                      viewBox="0 0 147 146"
                      fill="none"
                    >
                      <path
                       
                        id="star"
                        d="M74.352 110.547L73.4605 108.793L72.569 110.547L56.8076 141.563L57.2656 106.775L57.2915 104.807L55.6869 105.946L27.3169 126.085L43.8893 95.4947L44.8267 93.7645L42.8765 94.0274L8.39712 98.6753L37.2874 79.2902L38.9215 78.1938L37.0725 77.5202L4.38257 65.6124L38.9723 61.8738L40.9288 61.6624L39.6046 60.2067L16.1929 34.4711L48.558 47.2354L50.3887 47.9573L49.8926 46.053L41.1226 12.3853L63.8486 38.7284L65.134 40.2184L65.5798 38.3017L73.4605 4.41474L81.3411 38.3017L81.7869 40.2184L83.0723 38.7284L105.798 12.3853L97.0283 46.053L96.5322 47.9573L98.3629 47.2354L130.728 34.4711L107.316 60.2067L105.992 61.6624L107.949 61.8738L142.538 65.6124L109.848 77.5202L107.999 78.1938L109.633 79.2902L138.524 98.6753L104.044 94.0274L102.094 93.7645L103.032 95.4947L119.604 126.085L91.2341 105.946L89.6294 104.807L89.6553 106.775L90.1133 141.563L74.352 110.547Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                    ref={starRef}
                      className="bottom-0  left-[-3rem] md:hidden absolute"
                      xmlns="http://www.w3.org/2000/svg"
                      width="147"
                      height="146"
                      viewBox="0 0 147 146"
                      fill="none"
                    >
                      <path
                       
                        id="star"
                        d="M74.352 110.547L73.4605 108.793L72.569 110.547L56.8076 141.563L57.2656 106.775L57.2915 104.807L55.6869 105.946L27.3169 126.085L43.8893 95.4947L44.8267 93.7645L42.8765 94.0274L8.39712 98.6753L37.2874 79.2902L38.9215 78.1938L37.0725 77.5202L4.38257 65.6124L38.9723 61.8738L40.9288 61.6624L39.6046 60.2067L16.1929 34.4711L48.558 47.2354L50.3887 47.9573L49.8926 46.053L41.1226 12.3853L63.8486 38.7284L65.134 40.2184L65.5798 38.3017L73.4605 4.41474L81.3411 38.3017L81.7869 40.2184L83.0723 38.7284L105.798 12.3853L97.0283 46.053L96.5322 47.9573L98.3629 47.2354L130.728 34.4711L107.316 60.2067L105.992 61.6624L107.949 61.8738L142.538 65.6124L109.848 77.5202L107.999 78.1938L109.633 79.2902L138.524 98.6753L104.044 94.0274L102.094 93.7645L103.032 95.4947L119.604 126.085L91.2341 105.946L89.6294 104.807L89.6553 106.775L90.1133 141.563L74.352 110.547Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </h1>
                <p className="text-[16px] font-normal leading-8">
                  "We build high-performance mobile apps, websites, and software
                  solutions tailored to your business needs. Let’s bring your
                  idea to life with top-notch tech!"
                </p>
                <div className="flex flex-col  sm:flex-row items-center gap-6">
                  <PrimaryButton
                    onClick={() =>
                      window.open(
                        "https://calendly.com/makemyapp-co/30min",
                        "_blank"
                      )
                    }
                  />

                  <SecondaryButton
                    text="View Our Work"
                    onClick={() => {
                      setOpenPreview(true);
                    }}
                  />

                  <CenterModal
                    onModal={openPreview}
                    onClick={() => setOpenPreview(false)}
                    borderTopWidth="1px"
                    marginTop="0.8rem"
                    marginBottom="0.5rem"
                    pdfUrl={brochure}
                  >
                    <PdfViewer pdfUrl={brochure} />
                  </CenterModal>
                </div>
              </div>
            </div>
            <div className=" hidden md2:block md2:w-[350px] lg3:w-[450px] xle:w-[518px] xle:h-[531.02px] relative  ">
              <img className="" src={Pic.src} alt="pic" />
              <svg
               ref={circleRef}
                visibility="hidden"
              className="absolute top-[7%] right-[-3%] lg3:top-[13%] lg3:right-0 aspect-[62/36] lg3:aspect-[82/56]  xle:aspect-[102/76]"
                xmlns="http://www.w3.org/2000/svg"
                width="102"
                height="76"
                viewBox="0 0 102 76"
                fill="none"
              >
                <path
               
                 className="writeEffect  "
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3316 24.289C13.8833 19.2044 17.4568 14.9975 22.1995 12.6721C26.5049 10.8134 31.4914 11.6871 34.9236 14.9016C36.8326 16.4661 37.4711 19.1242 36.4838 21.3969C35.7755 22.101 34.8 22.4619 33.8084 22.3866C32.8168 22.3113 31.9059 21.8072 31.3101 21.004C29.8178 18.6227 29.7959 15.5929 31.2534 13.1898C32.3361 10.7928 33.8479 8.61794 35.7127 6.77437C39.2002 2.98621 44.3628 1.25598 49.4036 2.18588C54.059 3.14749 57.6624 6.87648 58.4971 11.5964C58.9028 14.1156 57.8324 16.6449 55.7484 18.0916C53.9779 19.1056 51.7281 18.4859 50.7138 16.705C50.3458 15.3164 50.5093 13.839 51.1719 12.5665C51.613 11.4717 52.1819 10.4339 52.8667 9.47511C54.2979 7.50356 56.1209 5.8548 58.2193 4.63411C62.3884 2.09206 67.3216 1.13931 72.1265 1.94821C76.6207 2.57343 80.5485 5.32716 82.6967 9.35883C84.2244 14.0417 82.0886 19.1433 77.6961 21.3032C76.6415 21.9698 75.4963 22.4779 74.2965 22.8114C73.3089 23.2262 72.1755 23.0627 71.3426 22.3852C70.8509 21.0966 71.1775 19.6359 72.1701 18.6852C72.864 17.7266 73.6641 16.851 74.5547 16.0754C78.2175 12.8553 83.0681 11.365 87.8881 11.9788C92.6185 12.707 96.6914 15.736 98.7804 20.0796C100.978 24.2285 100.919 29.223 98.6239 33.3179C96.2336 37.1591 92.1712 39.6202 87.6872 39.9435C86.6244 40.0159 85.5568 39.9432 84.5132 39.7275C83.334 39.6107 82.2224 39.1173 81.3402 38.3192C80.8967 37.532 80.9094 36.5644 81.3733 35.7892C81.8341 34.807 82.5774 33.9875 83.5064 33.4376C87.3635 31.5069 91.9869 32.0576 95.2925 34.8412C98.9151 37.6418 100.682 42.2509 99.869 46.7819C98.905 51.8169 95.9123 56.222 91.6057 58.9452C87.5494 61.573 82.6099 62.4278 77.9175 61.3142C75.6521 60.7632 73.5835 59.5867 71.9435 57.9165C70.4766 56.483 69.7725 54.4312 70.0467 52.3895C70.3403 51.4263 71.1075 50.6854 72.074 50.4315C73.0405 50.1776 74.0684 50.447 74.7903 51.1434C76.6072 53.0097 77.3881 55.6638 76.8749 58.2281C76.327 63.0809 73.7139 67.4532 69.7156 70.2068C65.9772 73.0026 61.1155 73.7657 56.7119 72.2478C52.7188 70.5947 49.5933 67.3314 48.0925 63.2484C47.3279 61.2907 46.9936 59.1889 47.1128 57.0881C47.1875 56.0091 47.4069 54.9452 47.7653 53.9257C47.9295 52.8084 48.6396 51.8494 49.6549 51.3736C50.7172 51.3546 51.6576 52.0634 51.9408 53.0966C52.2565 54.4992 52.1665 55.9637 51.6814 57.3161C51.018 59.7542 49.9342 62.0554 48.4795 64.1142C45.7455 68.1669 41.4868 70.9143 36.6935 71.7177C32.0983 72.3093 27.4812 70.8005 24.1023 67.6031C20.9372 64.5619 19.7281 59.9877 20.972 55.7602C21.5295 53.7181 22.5933 51.853 24.063 50.3407C24.7693 49.6236 25.5763 49.0153 26.4582 48.5354C26.8895 48.3016 27.3396 48.1053 27.8038 47.9484C28.3027 47.6722 28.8832 47.5853 29.44 47.7037C29.8777 48.4973 29.8472 49.4695 29.3607 50.2336C28.8704 51.3799 28.2539 52.4668 27.5227 53.4739C26.0438 55.516 24.132 57.1994 21.9266 58.4015C19.7625 59.6059 17.3279 60.2288 14.8565 60.2105C12.4823 60.1468 10.1721 59.4195 8.18332 58.1096C4.06751 55.6487 1.77205 50.9749 2.32437 46.1801C3.25954 41.5019 6.94632 37.8834 11.6071 37.0693C13.9674 36.518 16.4249 37.4504 17.8405 39.4341C19.1936 41.9799 15.2365 42.7668 13.5581 42.7495C8.82796 42.8625 4.70573 39.5192 3.7984 34.834C2.89107 30.1487 5.46282 25.4858 9.88724 23.794C12.1098 22.7374 14.7232 22.9639 16.7347 24.3873C17.5138 25.0106 17.9848 25.9456 18.0245 26.9479C18.0643 27.9502 17.6688 28.9201 16.9416 29.6042C16.0671 29.9986 15.0702 30.0119 14.1857 29.641C13.3012 29.2701 12.6073 28.5478 12.2675 27.6442C11.5617 24.9926 12.3168 22.1626 14.2467 20.227C14.8886 19.478 13.8101 18.3806 13.1639 19.1342C10.6902 21.3733 9.64754 24.8096 10.4551 28.0621C11.4063 30.6495 14.0873 32.1487 16.7661 31.5914C17.9447 31.126 18.8883 30.202 19.3847 29.0274C19.8811 27.8528 19.8886 26.5261 19.4055 25.3458C18.1946 22.6134 15.3595 20.9967 12.4148 21.3594C6.73754 21.9376 2.2678 26.5033 1.76475 32.238C1.45768 38.0004 5.35019 43.1322 10.9433 44.3388C13.6293 45.1435 16.5346 44.6126 18.7702 42.9084C19.8468 41.8487 20.1453 40.2198 19.5155 38.8417C18.871 37.5294 17.7859 36.4904 16.4534 35.9096C12.4099 34.7071 8.0383 35.6145 4.79377 38.33C1.54923 41.0455 -0.142398 45.2126 0.281928 49.4442C0.668717 52.2508 1.88922 54.8732 3.7826 56.966C7.68884 61.4209 13.7951 63.1964 19.4521 61.5222C22.2083 60.6736 24.726 59.1782 26.7989 57.1585C27.8852 56.1073 28.8431 54.929 29.6524 53.6486C30.4476 52.4897 31.0452 51.2049 31.4207 49.8473C31.841 48.6144 31.552 47.2481 30.6694 46.2956C29.3333 45.5624 27.7082 45.6174 26.4237 46.4392C24.1401 47.442 22.2052 49.1098 20.8666 51.2288C17.9423 55.6507 17.6946 61.3455 20.2236 66.009C23.1713 70.7279 28.2483 73.6628 33.7739 73.8421C39.4916 73.9809 44.9567 71.4666 48.6022 67.0202C50.518 64.7782 52.0072 62.1987 52.9949 59.4113C54.5542 56.6195 54.366 53.1684 52.5127 50.5659C51.4477 49.4785 49.8392 49.1434 48.4344 49.7162C47.1607 50.5081 46.2422 51.7686 45.8731 53.2314C45.0136 55.6775 44.8096 58.3091 45.2816 60.8602C46.2078 65.9892 49.3077 70.4543 53.7687 73.0851C58.5913 75.7585 64.4551 75.6617 69.1883 72.8304C74.1799 70.0095 77.6337 65.0563 78.5788 59.3632C79.2111 56.3435 78.5901 53.1944 76.8604 50.6489C76.0099 49.4819 74.7208 48.7194 73.296 48.5407C71.8712 48.362 70.4363 48.7827 69.3284 49.704C67.6798 51.7581 67.4551 54.6245 68.7633 56.9145C70.0133 59.3103 72.0443 61.1977 74.5135 62.258C79.8022 64.5387 85.8267 64.3007 90.9224 61.6097C96.2104 58.9025 100.048 53.9823 101.412 48.16C102.043 45.4204 101.899 42.5571 100.995 39.8963C100.091 37.4773 98.5418 35.3573 96.5191 33.7701C92.6812 30.3627 87.1923 29.61 82.5923 31.8605C80.1318 33.0783 78.7998 35.8216 79.3542 38.5296C79.9797 39.8531 81.1761 40.8108 82.5957 41.1243C83.8695 41.5513 85.2008 41.7785 86.5429 41.7979C91.8595 41.8089 96.8292 39.1359 99.7837 34.6763C102.619 29.9803 102.742 24.111 100.106 19.2984C97.5969 14.2971 92.7436 10.9225 87.2183 10.3377C81.5686 9.85964 76.0091 11.9946 72.1043 16.1418C70.3794 17.9992 67.8034 21.6798 70.4903 23.876C73.1284 25.0809 76.2191 24.6381 78.4204 22.7399C80.9327 21.2764 82.9161 19.0417 84.0819 16.3615C85.0674 13.9196 85.046 11.1819 84.0223 8.75601C81.5544 4.01189 76.8933 0.832236 71.6103 0.28889C66.0075 -0.452404 60.3352 0.985765 55.7453 4.3113C53.4448 5.94617 51.5557 8.1019 50.2294 10.6058C48.3871 13.0445 48.4023 16.4289 50.2666 18.8506C52.2906 20.5413 55.21 20.5765 57.2734 18.935C59.4276 16.9728 60.4185 14.0235 59.8909 11.1442C58.7966 5.65403 54.4255 1.43469 48.9409 0.574485C43.1019 -0.13804 37.3064 2.20561 33.5714 6.78969C31.4201 9.11815 29.8369 11.9209 28.9477 14.9751C27.922 17.8421 28.8304 21.0496 31.2025 22.937C32.1726 23.7081 33.4076 24.0569 34.6336 23.9059C35.8595 23.7548 36.975 23.1165 37.7327 22.1325C38.9705 19.5224 38.4286 16.4073 36.384 14.3784C32.6424 10.387 26.8407 9.1535 21.821 11.2821C16.6056 13.7302 12.7301 18.3797 11.2338 23.9835C11.1609 24.2857 11.3392 24.5917 11.6364 24.6743C11.9336 24.757 12.2421 24.5863 12.3328 24.289H12.3316Z"
                  fill="white"
                />
              </svg>
              <img
                className="  absolute md2:top-[-1rem] md2:left-[-5rem] xle:top-[-3rem] xle:left-[-8rem]  md2:w-[300px] lg3:w-[380px]  xle:w-[497px]"
                src={MacBook.src}
                alt="macbook"
              />
              <svg
              ref={spirleRef}
               visibility="hidden"
              className="absolute bottom-[33%]  md4:bottom-[45%]  lg:bottom-[38%] lg2:bottom-[53%] lg3:bottom-[26%] xle:bottom-[28%] aspect-[42/41] lg3:aspect-[52/51] xle:aspect-[72/71] "
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="71"
                viewBox="0 0 72 71"
                fill="none"
              >
                <path
                
               
                 className="writeEffect  "
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M61.0319 68.8706C64.6375 69.1554 68.2429 68.2885 71.3268 66.3951L71.9029 67.7679C70.3425 68.7867 68.6099 69.5139 66.7897 69.9139C63.0632 70.9298 59.1026 70.6377 55.5712 69.0864C52.8188 67.8093 50.4615 65.8439 48.7173 63.3976C49.2051 63.1768 49.6826 62.9327 50.1481 62.6661C50.5741 63.3214 51.052 63.9462 51.579 64.5343C54.1454 67.0066 57.4779 68.5354 61.0319 68.8706ZM49.3115 61.2102C49.563 61.7097 49.8422 62.1957 50.1481 62.6661C51.0805 62.132 51.9646 61.5075 52.7867 60.7982C55.6555 58.7131 57.5841 55.5822 58.1519 52.0881C58.2391 50.0055 57.3947 47.9936 55.8473 46.597C54.7933 45.519 53.3683 44.8807 51.8594 44.8108C49.0146 45.4163 46.7779 47.6153 46.1285 50.4452C45.01 54.13 45.5049 58.1119 47.4906 61.4064C47.533 61.4869 47.5761 61.567 47.6197 61.6468C47.2521 61.7184 46.8811 61.7759 46.5073 61.819C43.3527 62.7039 40.0227 62.7497 36.8483 61.9517C29.8508 59.3114 23.9553 54.3904 20.1152 47.9848C17.7426 44.3198 16.2717 40.1849 15.7746 35.9121C17.153 36.4386 18.6064 36.7805 20.0978 36.9206C23.7533 37.0883 27.2932 35.6027 29.7342 32.8763C32.1822 30.4182 33.1494 26.8547 32.2777 23.5052C31.3592 20.3393 28.8386 17.8925 25.6422 17.0639C21.7522 16.26 17.7635 17.934 15.6124 21.2733C13.7249 24.9147 12.8551 28.9242 13.0017 32.9021C10.5944 31.0562 8.65905 28.6523 7.3708 25.8855C3.99266 19.8247 3.23527 12.6476 5.27306 6.00689C5.46601 4.9033 5.77609 3.82458 6.19719 2.78874L9.6222 8.10272L6.82377 1.43491L6.57685 0.846573C6.35521 1.16219 6.14217 1.48237 5.93778 1.80676L5.6438 1.93014L5.75471 2.10222C2.2973 7.77757 1.45232 14.6916 3.49292 21.0547C4.69309 25.2458 6.93259 29.0655 10.0046 32.1611C10.9484 33.1103 11.9985 33.9335 13.1283 34.6181C13.4464 37.4849 14.2969 40.3049 15.6794 42.9268C18.7658 51.0549 24.6386 57.8239 32.2566 62.0336C35.6099 63.8235 39.3449 64.7866 43.1502 64.8426C45.0865 64.6818 46.9683 64.1891 48.7173 63.3976C48.3185 62.8383 47.9518 62.2538 47.6197 61.6468C48.1931 61.5351 48.758 61.3891 49.3115 61.2102ZM5.75471 2.10222L6.19719 2.78874C6.38431 2.32847 6.59335 1.87667 6.82377 1.43491L5.93778 1.80676C5.87596 1.90486 5.81494 2.00335 5.75471 2.10222ZM15.6522 34.5888C15.6826 35.0311 15.7234 35.4723 15.7746 35.9121C14.8556 35.561 13.9698 35.128 13.1283 34.6181C13.065 34.0476 13.0228 33.4751 13.0017 32.9021C13.5589 33.3294 14.1415 33.7268 14.7471 34.0918C15.0431 34.27 15.345 34.4357 15.6522 34.5888ZM15.6522 34.5888C15.5141 32.5837 15.5897 30.5559 15.8863 28.5393C16.4913 25.0751 18.6242 22.0627 21.6951 20.335C24.4172 18.9655 27.7256 19.7001 29.6023 22.0908C31.463 24.247 31.9261 27.2761 30.7954 29.8937C29.5974 32.7239 27.1641 34.8506 24.1956 35.6621C21.2966 36.2856 18.2839 35.9004 15.6522 34.5888ZM49.3115 61.2102C48.3927 59.3858 47.843 57.3832 47.7106 55.317C46.9745 52.7115 47.6329 49.9086 49.4536 47.8964C50.5602 47.1648 51.9157 46.9112 53.2108 47.1933C54.5059 47.4755 55.6302 48.2695 56.3273 49.3941C56.9283 51.0641 56.8726 52.9006 56.1714 54.5339C55.7232 56.0474 54.9784 57.4575 53.9805 58.6826C52.5863 59.8096 51.0021 60.6638 49.3115 61.2102ZM2.29438 3.21746C1.66765 3.53451 1.01918 3.80667 0.35391 4.03186L0.742002 3.86898L2.29438 3.21746ZM2.29438 3.21746L2.48842 3.13602C3.08344 2.92362 3.66646 2.67893 4.23484 2.40306C4.79486 2.10911 5.37919 1.86387 5.98126 1.6701C4.87562 2.44047 3.61864 2.96802 2.29438 3.21746Z"
                  fill="white"
                />
              </svg>
              <img
                className=" iphone absolute md:bottom-[3rem] md4:bottom-[9.5rem] lg:bottom-[6rem] lg2:bottom-[15rem] xle:bottom-[3rem] right-[-1rem] md2:w-[182px] lg3:bottom-[3rem] lg3:w-[230px] xle:w-[255px] "
                src={Iphone.src}
                alt="iphone"
              />
              <svg
               ref={arrowRef}
                visibility="hidden"
              className="absolute bottom-0 md4:bottom-[19%] lg:bottom-[10%] lg2:bottom-[32%] lg3:bottom-[-5%] xle:bottom-[1%] left-[50%] aspect-[56/25]  xle:aspect-[76/45] "
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="45"
                viewBox="0 0 76 45"
                fill="none"
              >
                <path
               
                 className="writeEffect  "
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.9999 41.8429C12.3285 42.7357 6.58938 43.1355 0.845511 43.0381L0.845519 43.0374C0.250361 43.0357 0.0631988 44.0126 0.686565 44.1197C7.29033 45.1461 14.0153 44.9907 20.5539 43.6606C32.1704 41.4465 43.1307 36.6114 52.6206 29.5147C57.401 25.968 61.7611 21.8772 65.6156 17.3224C67.6626 14.8565 69.5569 12.2682 71.2889 9.5722L71.3022 9.50898C71.6285 7.97092 71.9589 6.43505 72.2976 4.90104C73.2723 4.7606 73.4577 3.4546 72.6986 3.1039C72.8309 2.51751 72.9647 1.93138 73.1001 1.34548L75.3982 2.37306C74.1531 4.84632 72.7813 7.2492 71.2889 9.5722L70.4877 13.372C70.6051 13.1771 70.818 13.0549 71.0515 13.0593C71.3373 13.0646 71.587 13.2581 71.6667 13.536C71.8901 14.5033 72.0106 15.4621 72.1324 16.4322C72.1735 16.7589 72.2147 17.0869 72.26 17.417L69.6667 17.724C69.6799 18.2951 70.0555 18.8152 70.6232 18.9847C71.3071 19.1888 72.0257 18.811 72.2507 18.1289C72.653 16.794 72.9535 15.4294 73.1496 14.047L73.9544 10.1186C74.506 7.44142 75.0314 4.75822 75.5305 2.06899C75.692 1.45553 75.3903 0.811697 74.8173 0.547294C74.2393 0.284001 73.5602 0.495604 73.2324 1.04108C72.9186 1.7057 72.5941 2.36461 72.2591 3.01755C70.4102 3.01347 68.567 3.20455 66.7602 3.58762C65.8234 3.79772 64.9024 4.07175 64.0037 4.4078C63.2093 4.59411 62.4871 5.00704 61.9246 5.59662C61.7953 5.81211 61.7735 6.07588 61.8654 6.31092C61.9573 6.54596 62.1526 6.72576 62.3943 6.79781C63.1811 6.84442 63.967 6.7067 64.6893 6.39561C65.4433 6.17972 66.2079 5.99815 66.9735 5.81638C67.0371 5.80126 67.1008 5.78615 67.1644 5.77101C68.4895 5.45197 69.8309 5.20451 71.1829 5.02964C68.7309 9.43077 65.7887 13.5378 62.4102 17.2697C54.6795 25.8948 45.1425 32.6667 34.4875 37.0966C29.1873 39.297 23.6569 40.8891 17.9999 41.8429ZM70.0927 15.0246C70.1955 14.5472 70.3111 14.0725 70.4393 13.6012L70.4877 13.372C70.4614 13.4155 70.44 13.4626 70.4241 13.5128C70.2905 14.0172 70.185 14.5204 70.0927 15.0246ZM70.0927 15.0246C69.9008 15.9164 69.7535 16.8179 69.6516 17.7258L69.6667 17.724C69.664 17.6071 69.6765 17.488 69.7057 17.3694C69.7597 17.0508 69.8101 16.7339 69.8602 16.4183C69.9343 15.9516 70.0079 15.4877 70.0927 15.0246Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          {/* Mobile Marquee */}
          <div className=" flex md:hidden w-screen mt-[31px] items-center  bg-white overflow-hidden -ml-5 h-[48px]">
            <div className="flex shrink-0 align-middle justify-between  animate-marquee whitespace-nowrap ">
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[32px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Custom Mobile Apps
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Scalable Websites
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Enterprise Software
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  MVPs for Startups
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  AI-Powered Solutions
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Business Automation
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  E-commerce & SaaS Platforms
                </span>
              </p>
            </div>
            {/* Duplicate marquee content for seamless animation */}
            <div className="flex shrink-0 align-middle justify-between  animate-marquee whitespace-nowrap ">
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[32px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Custom Mobile Apps
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Scalable Websites
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Enterprise Software
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  MVPs for Startups
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  AI-Powered Solutions
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  Business Automation
                </span>
              </p>
              <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
                <img src={star1.src || star1} className="h-[40px] w-[40px]" />
                <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                  E-commerce & SaaS Platforms
                </span>
              </p>
            </div>
          </div>
          <Carousel slides={SlderData} />
           <div className="flex justify-between gap-[20px] mt-[36px] md:mt-[58px]">
          <div className="font-[500] text-[#fffefe] text-[12px] sm:text-[18px] leading-[20px]">
            Tapop Smart Tech Private Limited
          </div>
          <div  className="font-[500] text-[#f6f3f3] text-[12px] sm:text-[18px] leading-[20px]">
            <Link href="/privacy-policy">
            Privacy-Policy
            </Link>
          </div>
        </div>
        </div>
        <div className="hidden md:flex sticky bottom-0 items-center bg-white overflow-hidden w-full h-[48px]">
          <div className="flex shrink-0 align-middle justify-between animate-marquee whitespace-nowrap">
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[32px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Custom Mobile Apps
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Scalable Websites
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Enterprise Software
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                MVPs for Startups
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                AI-Powered Solutions
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Business Automation
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                E-commerce & SaaS Platforms
              </span>
            </p>
          </div>
          {/* Duplicate marquee content for seamless animation */}
          <div className="flex shrink-0 align-middle justify-between animate-marquee whitespace-nowrap">
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[32px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Custom Mobile Apps
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Scalable Websites
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Enterprise Software
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                MVPs for Startups
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                AI-Powered Solutions
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                Business Automation
              </span>
            </p>
            <p className="font-[500] flex items-center text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
              <img src={star1.src || star1} className="h-[40px] w-[40px]" />
              <span className="text-[#FF6B00] uppercase font-[900] tracking-[3px]">
                E-commerce & SaaS Platforms
              </span>
            </p>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default HomePage;
