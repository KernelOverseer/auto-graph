import React from "react";
import { lineProps } from "../interfaces/nodeData";
import { useEffect } from "react";
import { getDisplayCoords } from "../logic/transforms";

const GraphLink: React.FC<lineProps> = ({ node1, node2, flag, actions }) => {
  const coords1 = getDisplayCoords(node1.x, node1.y, actions.transform);
  const coords2 = getDisplayCoords(node2.x, node2.y, actions.transform);

  const x1 = coords1.x + 25;
  const x2 = coords2.x + 25;
  const y1 = coords1.y + 25;
  const y2 = coords2.y + 25;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  const lineStyle = {
    position: "absolute",
    top: y1,
    left: x1,
    width: length,
    height: 2,
    background: flag === true ? "darkgray" : "black",
    transform: `rotate(${angle}deg)`,
    transformOrigin: "top left",
  } as React.CSSProperties;

  return (
    <div className="line-container">
      <div className="line" style={lineStyle}></div>
    </div>
  );
};

export default GraphLink;
