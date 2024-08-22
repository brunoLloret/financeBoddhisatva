import React, { useEffect, useRef, useState } from "react";

interface Indicators {
  name: string;
  price: number;
  change: number;
  changePercent: string;
}

interface CylindricalStringsProps {
  indicatorsData: Indicators[];
}
const CylindricalStrings: React.FC<CylindricalStringsProps> = ({
  indicatorsData = [],
}) => {
  const [indicators, setIndicators] = useState<Indicators[]>([]);
  const stringRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    console.log("Indicators Data Received:", indicatorsData);
    if (Array.isArray(indicatorsData)) {
      setIndicators(
        indicatorsData.map((indicator) => ({
          name: indicator.name,
          price: indicator.price,
          change: indicator.change,
          changePercent: indicator.changePercent,
        }))
      );
    }
  }, [indicatorsData]);

  useEffect(() => {
    const radius = 30; // Adjust as necessary
    const height = 5;
    const speed = 0.0001;

    function animate() {
      const time = Date.now() * speed;
      console.log("Animating at time:", time);

      stringRefs.current.forEach((ref, index) => {
        if (ref) {
          const angle = (index / indicators.length) * Math.PI * 2;
          const x = radius * Math.cos(angle + time);
          const z = radius * Math.sin(angle + time);
          const y = height * (Math.sin(angle + time) / 1);

          console.log(`Positioning ${indicators[index].name}:`, { x, y, z });

          ref.style.transform = `translate3d(${x}rem, ${y}rem, ${z}rem)`;
        }
      });

      requestAnimationFrame(animate);
    }

    if (indicators.length > 0) {
      console.log("Indicators length:", indicators.length);
      animate();
    }
  }, [indicators]);

  return (
    <div
      style={{
        fontFamily: "fantasy",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        perspective: "1000px",
        pointerEvents: "none",
      }}
    >
      {indicators.map((indicator, index) => (
        <div
          key={index}
          ref={(el) => (stringRefs.current[index] = el)}
          style={{
            position: "absolute",
            color: "green",
            fontFamily: "Monospace",
            fontSize: "20px",
          }}
        >
          {`${indicator.name}: ${indicator.change}`}
        </div>
      ))}
    </div>
  );
};

export default CylindricalStrings;

// import React, { useEffect, useRef, useState } from "react";
// import { nasdaqIndicators } from "./nasdaqIndicators";
// import { hkChinaIndicators } from "./hkChinaIndicators";

// const data: string =
//   " 言者不知知者默 * 此語吾聞於老君 * 若道老君是知者 * 缘何自著五千文 .::.";

// interface Indicators {
//   name: string;
//   price: number;
//   change: number;
//   changePercent: string;
// }

// const CylindricalStrings: React.FC = () => {
//   const [indicators, setIndicators] = useState<Indicators[]>([]);

//   const stringRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     setIndicators(
//       nasdaqIndicators.map((indicator) => ({
//         name: indicator.symbol,
//         price: indicator.lastPrice,
//         change: indicator.percentageChange,
//         changePercent: `${indicator.percentageChange}`,
//       }))
//     );
//   }, []);

//   useEffect(() => {
//     const radius = 30; // Adjust as necessary
//     const height = 5;
//     const speed = 0.0001;

//     function animate() {
//       const time = Date.now() * speed;

//       stringRefs.current.forEach((ref, index) => {
//         if (ref) {
//           const angle = (index / indicators.length) * Math.PI * 2;
//           const x = radius * Math.cos(angle + time);
//           const z = radius * Math.sin(angle + time);
//           const y = height * (Math.sin(angle + time) / 1);

//           ref.style.transform = `translate3d(${x}rem, ${y}rem, ${z}rem)`;
//         }
//       });

//       requestAnimationFrame(animate);
//     }

//     if (indicators.length > 0) {
//       animate();
//     }
//   }, [indicators]);

//   return (
//     <div
//       style={{
//         fontFamily: "fantasy",
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         perspective: "1000px",
//         pointerEvents: "none",
//       }}
//     >
//       {indicators.map(
//         (
//           indicator: {
//             name: string;
//             price: number;
//             change: number;
//             changePercent: string;
//           },
//           index: number
//         ) => (
//           <div
//             key={index}
//             ref={(el) => (stringRefs.current[index] = el)}
//             style={{
//               position: "absolute",
//               color: "green",
//               fontFamily: "Monospace",
//               fontSize: "20px",
//             }}
//           >
//             {`${indicator.name}: ${indicator.change}`}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default CylindricalStrings;
