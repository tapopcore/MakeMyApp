import Link from 'next/link'
import React from 'react'

const SideBar = (props) => {
  return (
    <div>
    <div
      className="flex flex-col justify-between items-center text-[#FFF] bg-[#FF6B00] w-screen fixed"
      style={{ height: "calc(100vh - 80px)", zIndex: '997' }}
    >
      <div className=" w-[100vw] text-[16px] ">
        <Link
          href={"/about"}
          className="inline-block py-[22px] pl-[20px] w-full text-left font-medium"
        >
          About us
        </Link>
        <hr className="ml-[20px]" />
        
        <Link
          href={"/contact"}
          className="inline-block py-[22px] pl-[20px] w-full text-left font-medium "
        >
          Contact
        </Link>
        <hr className="ml-[20px]" />
      
      </div>
    </div>
  </div>
  )
}

export default SideBar