import React from "react";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const SecondaryButton = (props) => {
  props = useDefaultProps(props);
  return (
    <>
      <button
        text={props.text}
        type={props.type}
        disabled={props.isDisabled}
        onClick={props.onClick}
        className={`min-w-[157px] min-h-[48px] px-6 py-3 bg-transparent text-[#FFFF] text-[14px] rounded-[6px] font-[900] border border-[#FFF] ${props.className}`}
      >
        {props.text}
      </button>
    </>
  );
};

const defaultProps = {
  text: "View Our Work",
};

export default SecondaryButton;
