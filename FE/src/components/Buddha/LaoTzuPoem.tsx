import React, { useState, useEffect, useCallback } from "react";
import "../../components/Buddha/css/Home.module.css";
import "../Buddha/css/LaoTzuPoem.css";

const LaoTzuPoem = () => {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

  const poems = [
    [
      { text: "言者不知知者默", className: "poem-line-class1" },
      { text: "此語吾聞於老君", className: "poem-line-class1" },
      { text: "若道老君是知者", className: "poem-line-class1" },
      { text: "缘何自著五千文", className: "poem-line-class1" },
    ],
    [
      {
        text: "* ||..|||| \\ .:  .   :  | ..  ",
        className: "poem-line-class2",
      },
      {
        text: " |||||\\|| \\ .:  .   :  | ..  ",
        className: "poem-line-class2",
      },
      {
        text: "^ |||||||| \\ .:  .   :  | ..   ",
        className: "poem-line-class1",
      },
      { text: "  ||\\|||..||||| ||||||||||||", className: "poem-line-class1" },
      { text: "  .:  *   *   ||||||||   *", className: "poem-line-class1" },
    ],
    [{ text: "䷝  離", className: "poem-line-class3" }],
    [{ text: "美食，美好生活", className: "nestle-poem" }],
    [
      { text: "登鹤雀楼", className: "poem-line-class4" },
      { text: "白日依山盡，", className: "poem-line-class4" },
      { text: "黃河入海流；", className: "poem-line-class4" },
      { text: "欲窮千里目，", className: "poem-line-class4" },
      { text: "更上一層樓。", className: "poem-line-class4" },
    ],
    [
      {
        text: "美国、加拿大和墨西哥的经济实惠巴士票",
        className: "greyhound-poem",
      },
    ],
  ];

  const getRandomDuration = useCallback(() => {
    return Math.floor(Math.random() * (12000 - 3000 + 1) + 3000); // Random number between 3000 and 12000 ms
  }, []);

  useEffect(() => {
    const changePoemWithRandomInterval = () => {
      const duration = getRandomDuration();
      setTimeout(() => {
        setCurrentPoemIndex((prevIndex) => (prevIndex + 1) % poems.length);
        changePoemWithRandomInterval(); // Set up the next change
      }, duration);
    };

    changePoemWithRandomInterval(); // Start the cycle

    return () => {
      // This will not actually clear the timeout, but it's here to remind you that
      // in a more complex setup, you'd want to clear any ongoing timeouts.
    };
  }, [getRandomDuration, poems.length]);

  const currentPoem = poems[currentPoemIndex];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPoemIndex((prevIndex) => (prevIndex + 1) % poems.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  // const currentPoem = poems[currentPoemIndex];

  return (
    <div className="poem-container">
      {currentPoem.map((line, index) => (
        <div key={index} className={`poem-column ${line.className}`}>
          {line.text.split("").map((char, charIndex) => (
            <div
              key={charIndex}
              className="poem-char"
              style={{ top: `${charIndex * 15}px` }}
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

// import React from "react";
// import "../../components/Buddha/css/Home.module.css"; // Import the CSS file
// import "../Buddha/css/LaoTzuPoem.css";

// const LaoTzuPoem = () => {
//   const poemLines = [
//     { text: "言者不知知者默", className: "poem-line-class1" },
//     { text: "此語吾聞於老君", className: "poem-line-class1" },
//     { text: "若道老君是知者", className: "poem-line-class1" },
//     { text: "缘何自著五千文", className: "poem-line-class1" },
//     { text: " * * * ", className: "poem-line-class2" },

//     { text: "* ||..|||| \\ .:  .   :  | ..  ", className: "poem-line-class2" },
//     { text: " |||||\\|| \\ .:  .   :  | ..  ", className: "poem-line-class2" },
//     { text: "^ |||||||| \\ .:  .   :  | ..   ", className: "poem-line-class1" },
//     { text: "  ||\\|||..||||| ||||||||||||", className: "poem-line-class1" },
//     { text: "  .:  *   *   ||||||||   *", className: "poem-line-class1" },

//     { text: "䷝  離", className: "poem-line-class3" },

//     {text: "美食，美好生活", className: "nestle-poem"},

//     {text: "登鹤雀楼", className: "poem-line-class4"},
//     {text: "白日依山盡，", className: "poem-line-class4"},
//     {text: "黃河入海流；", className: "poem-line-class4"},
//     {text: "欲窮千里目，", className: "poem-line-class4"},
//     {text: "更上一層樓。", className: "poem-line-class4"},

//     {text: "美国、加拿大和墨西哥的经济实惠巴士票", className: "greyhound-poem"},

//     登鹤雀楼 written by Wang Zhihuan.

// 白日依山盡， The white sun sets behind the mountains,

// 黃河入海流； and the Yellow River flows into the sea.

// 欲窮千里目， To see a thousand mile view,

// 更上一層樓。 go up another floor.

//   ];

//   return (
//     <div className="poem-container">
//       {poemLines.map((line, index) => (
//         <div key={index} className={`poem-column ${line.className}`}>
//           {line.text.split("").map((char, charIndex) => (
//             <div
//               key={charIndex}
//               className="poem-char"
//               style={{ top: `${charIndex * 20}px` }}
//             >
//               {char}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LaoTzuPoem;

// import React from "react";
// import "../../components/Buddha/css/Home.module.css"; // Import the CSS file
// import "../Buddha/css/LaoTzuPoem.css";

// const LaoTzuPoem = () => {
//   const poemLines = [
//     "言者不知知者默",
//     "此語吾聞於老君",
//     "若道老君是知者",
//     "缘何自著五千文",
//     " * * * ",

//     "* ||..|||| \\ .:  .   :  | ..  ",
//     " |||||\\|| \\ .:  .   :  | ..  ",
//     "^ |||||||| \\ .:  .   :  | ..   ",
//     "  ||\\|||..||||| ||||||||||||",
//     "  .:  *   *   ||||||||   *",

//     "䷝  離",
//   ];

//   return (
//     <div className="poem-container">
//       {poemLines.map((line, index) => (
//         <div key={index} className="poem-column">
//           {line.split("").map((char, charIndex) => (
//             <div
//               key={charIndex}
//               className="poem-char"
//               style={{ top: `${charIndex * 20}px` }}
//             >
//               {char}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LaoTzuPoem;
