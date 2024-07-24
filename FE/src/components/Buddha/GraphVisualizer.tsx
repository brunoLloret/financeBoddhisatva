// GraphVisualizer.tsx
import React from "react";

interface GraphVisualizerProps {
  pathData: string;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ pathData }) => {
  return (
    <svg
      width="100%"
      height="400"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={pathData}
        fill="transparent"
        stroke="#d60a22"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default GraphVisualizer;
