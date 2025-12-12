import React, { useCallback, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import "./centermodal.css";
import { isMobile } from "react-device-detect";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function CenterModal(props) {
  props = useDefaultProps(props);
  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      props.onClick();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  const style = {
    width: props.width,
    maxWidth: props.maxWidth,
    height: props.height,
  };

  const Border = {
    borderTopWidth: props.borderTopWidth,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
  };

  return (
    <div
      id="centerModal"
      className="Cmodal"
      style={{ display: `${props.onModal ? "flex" : "none"}`, zIndex: "1000" }}
    >
      <div className="Cmodal-box">
        <div
          className="flex items-center justify-between px-5 md:px-6 "
          style={{
            marginTop: Border.marginTop,
            marginBottom: Border.marginBottom,
          }}
        >
          {
            props.text && <p className="md:text-xl text-[15px] text-[#1A1A1A] tracking-normal font-semibold">
            {props.text}
          </p>
          }
          {
            props.pdfUrl &&   <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center"
            onClick={() => window.open(props.pdfUrl, "_blank")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {isMobile ? "Download" : "Download PDF"}
          </button>
          }
        
          <span
            onClick={() => {
              props.onClick((prev) => !prev);
              props.extraOnClick && props.extraOnClick((prev) => !prev);
            }}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{ cursor: "pointer" }}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className={`Cmodal-content ${props.className}`} style={style}>
          {/* to close modal  */}

          <div
            className="modal-child-div mx-[10px] md:mx-[20px] mb-[10px] md:mb-[20px]"
            style={Border}
          >
            {props.children}
          </div>
        </div>

        <div className="w-full flex items-center justify-between p-5 md:p-6">
          {props.bottomText && (
            <p className="md:text-xl text-[15px] text-[#1A1A1A] tracking-normal font-semibold">
              {props.bottomText}
            </p>
          )}
          {props.bottomChild && props.bottomChild}
        </div>
      </div>
    </div>
  );
}
const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
  borderTopWidth: "2px",
  marginTop: "1.5rem",
  marginBottom: "1.5rem",
};
export default CenterModal;
