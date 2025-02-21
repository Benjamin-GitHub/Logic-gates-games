import React from "react";
import { motion } from "framer-motion";

const GateConnections = ({ elements, connections, tempConnection, mousePosition, gateIcons }) => {
  return (
    <svg className="connections">
      {connections.map((conn, index) => {
        const fromEl = elements.find((el) => el.id === conn.from.id);
        const toEl = elements.find((el) => el.id === conn.to.id);
        if (!fromEl || !toEl) return null;

        const toGateData = gateIcons[toEl.type];

        const fromX = fromEl.x + 69;
        const fromY = fromEl.y + 39;

        const inputIndex = conn.to.portIndex || 0;
        let toX = toEl.x + 12;
        let toY = toEl.y + (toGateData.inputs === 1 ? 39 : inputIndex === 0 ? 33 : 49);

        const midX = (fromX + toX) / 2;
        const controlY1 = fromY;
        const controlY2 = toY;

        const pathD = `M ${fromX},${fromY} C ${midX},${controlY1} ${midX},${controlY2} ${toX},${toY}`;

        return (
          <motion.path
            key={index}
            d={pathD}
            stroke="blue"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        );
      })}

      {tempConnection && (
        <motion.path
          d={`M ${elements.find(el => el.id === tempConnection.id).x + 60},${elements.find(el => el.id === tempConnection.id).y + 30} 
              C ${(mousePosition.x + elements.find(el => el.id === tempConnection.id).x + 60) / 2},${elements.find(el => el.id === tempConnection.id).y + 30} 
              ${(mousePosition.x + elements.find(el => el.id === tempConnection.id).x + 60) / 2},${mousePosition.y} 
              ${mousePosition.x},${mousePosition.y}`}
          stroke="red"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
};

export default GateConnections;
