"use client";
import PrimaryButton from "@/components/Uicomponents/PrimaryButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import NavbarMobile from "./NavbarMobile";
import Logo from "../../assets/logo/Group 3.svg"
import Icon from "../../assets/logo/logo.svg"
import text from "../../assets/logo/text.svg"

const Navbar = () => {
  const navigate = useRouter();
  return (
    <>
    <NavbarMobile logo={Icon} />
   
    <div
      className={`bg-[#000000]  hidden md:flex sticky top-0 left-0 w-full items-center justify-between px-3 lg:px-10 xl:px-20   `}
      style={{
        backdropFilter: "blur(20px)",
        zIndex: "997",
      }}
    >
      <button
        onClick={() => {
          navigate.push("/");
        }}
        className="flex lg:-ml-8  xle:ml-12 items-center gap-x-1 font-[700]"
      >
        <Image
          className="h-[85px] w-[85px] aspect-[84/85] hover:cursor-pointer"
          src={Icon}
          alt="logo"
        />
        <Image  className="aspect-[125/18] w-[250px] h-[36px]  " src={text} alt="makemyapp" />
      </button>
    <PrimaryButton  onClick={() => window.open("https://calendly.com/makemyapp-co/30min", "_blank")} />
    </div>
    </>
  );
};

export default Navbar;
