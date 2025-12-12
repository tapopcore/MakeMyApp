import React from "react";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const PrimaryButton = (props) => {
  props = useDefaultProps(props);
  return (
    <>
      <button
        text={props.text}
        type={props.type}
        disabled={props.isDisabled}
        onClick={props.onClick}
        className=" w-auto h-auto max-w-[225px] min-h-[48px] px-3 md2:px-5 py-[10px] md2:py-[15px] bg-[#5D00FF] text-[#FFFF] rounded-[6px] leading-normal font-[900] text-[12px] md2:text-[14px] "
      >
        {props.text}
      </button>
    </>
  );
};

const defaultProps = {
  text: "Book A Free Consultation",
};

export default PrimaryButton;
