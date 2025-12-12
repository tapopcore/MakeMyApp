import Link from "next/link";
import React, { useState } from "react";
import * as hi2 from "react-icons/hi2";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import textmobile from "../../assets/logo/textmobile.svg";
import PrimaryButton from "@/components/Uicomponents/PrimaryButton";
const NavbarMobile = (props) => {
  const [sideBarToggle, setSideToggle] = useState(false);
  const navigate = useRouter();
  return (
    <>
      <div
        className={` bg-[#000000] flex flex-col justify-center sticky top-0 h-[80px]  px-2 xsm:px-5 w-screen  md:hidden`}
        style={{
          zIndex: "997",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex justify-between items-center h-[48px]">
          <Link className="flex items-center " href={`/`}>
            <Image
              alt="Image"
              src={props.logo && props.logo}
              className="w-16 h-auto"
            />
            <Image className=" hidden xsm:flex w-[130px] xsm1:min-w-[160px] " src={textmobile} alt="makemyapp" />
          </Link>
          <PrimaryButton
            onClick={() =>
              window.open("https://calendly.com/qviq-io/30min", "_blank")
            }
            text="Book A Call"
            className="!py-[10px] !px-[11px] min-w-[90px]"
          />
          {/* <div className="ms-auto flex items-center gap-2 xsm:gap-2">
            <div
              className={`w-[48px] h-[48px] flex justify-center items-center rounded-[10px] border-[1.6px] border-[#FFFF] `}
              style={{
                cursor: "pointer",
                // boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.08)",
              }}
              onClick={() => setSideToggle(!sideBarToggle)}
            >
              <span className="text-[25px] text-white">
                {sideBarToggle ? <hi2.HiXMark /> : <hi2.HiBars3 />}
              </span>
            </div>
          </div> */}
        </div>
      </div>
      {sideBarToggle && <SideBar setSideToggle={setSideToggle} />}
    </>
  );
};

export default NavbarMobile;
