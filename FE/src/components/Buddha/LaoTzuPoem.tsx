import React from "react";
import "../../components/Buddha/css/Home.module.css"; // Import the CSS file
import "../Buddha/css/LaoTzuPoem.css";

const LaoTzuPoem = () => {
  const poemLines = [
    // "言者不知知者默",
    // "此語吾聞於老君",
    // "若道老君是知者",
    // "缘何自著五千文",
    // " * * * ",

    "* ||..|||| \\ .:  .   :  | ..  ",
    " |||||\\|| \\ .:  .   :  | ..  ",
    "^ |||||||| \\ .:  .   :  | ..   ",
    "  ||\\|||..||||| ||||||||||||",
    "  .:  *   *   ||||||||   *",
    // '䷝  離'
  ];

  return (
    <div className="poem-container">
      {poemLines.map((line, index) => (
        <div key={index} className="poem-column">
          {line.split("").map((char, charIndex) => (
            <div
              key={charIndex}
              className="poem-char"
              style={{ top: `${charIndex * 20}px` }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LaoTzuPoem;
