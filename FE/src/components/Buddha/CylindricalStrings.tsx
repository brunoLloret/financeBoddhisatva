import React, { useEffect, useRef, useState } from "react";

const data: string =
  " 言者不知知者默 * 此語吾聞於老君 * 若道老君是知者 * 缘何自著五千文 .::.";

const CylindricalStrings: React.FC = () => {
  const [indicators, setIndicators] = useState<
    { name: string; price: number; change: number; changePercent: string }[]
  >([]);

  const stringRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/indicators"); // Fetch from the proxied API
        const data = await response.json();
        setIndicators(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Fetch data every 3 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const radius = 30;
    const height = 5;
    // The speed value must be slow for human sight
    const speed = 0.0001;

    function animate() {
      const time = Date.now() * speed;

      stringRefs.current.forEach((ref, index) => {
        if (ref) {
          const angle = (index / indicators.length) * Math.PI * 2;
          const x = radius * Math.cos(angle + time);
          const z = radius * Math.sin(angle + time);
          const y = height * (Math.sin(angle + time) / 1); // Adjust the height oscillation if needed

          ref.style.transform = `translate3d(${x}rem, ${y}rem, ${z}rem)`;
        }
      });

      requestAnimationFrame(animate);
    }

    if (indicators.length > 0) {
      animate();
    }
  }, [indicators]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          perspective: "1000px",
          pointerEvents: "none",
        }}
      >
        {indicators.map(
          (
            indicator: {
              name: string;
              price: number;
              change: number;
              changePercent: string;
            },
            index: number
          ) => (
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
              {`${indicator.name}: ${indicator.change} (${indicator.changePercent} %)`}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CylindricalStrings;
