import React from "react";

const Buttons = ({values[]}) => {

    const handleOnClick = () => {
        console.log("Button clicked");
    }

  return (
    <>
      <div>
  values[].map((value, index) (
    <button key={index} className="button" onClick={handleOnClick}>
        {value}
    </button>
    ))
      </div>
    </>
  );
};

export default Buttons;
