import React from "react";
import { motion } from "framer-motion";

const GateConnections = ({ elements, connections, tempConnection, mousePosition, gateIcons, fixedBlocks }) => {
  return (
    <svg className="connections">
      {connections.map((conn, index) => {
        const fromEl = elements.find((el) => el.id === conn.from.id) || fixedBlocks.find((block) => block.id === conn.from.id);
        const toEl = elements.find((el) => el.id === conn.to.id) || fixedBlocks.find((block) => block.id === conn.to.id);
        if (!fromEl || !toEl) return null;

        const toGateData = gateIcons[toEl.type] || {};

        const fromX = fromEl.x ? fromEl.x + 69 : parseInt(fromEl.left) + 60;
        const fromY = fromEl.y ? fromEl.y + 39 : parseInt(fromEl.top) + 20;

        const inputIndex = conn.to.portIndex || 0;
        let toX = toEl.x ? toEl.x + 12 : parseInt(toEl.left) + 10;
        let toY = toEl.y ? toEl.y + (toGateData.inputs === 1 ? 39 : inputIndex === 0 ? 33 : 49) : parseInt(toEl.top) + 20;

        const midX = (fromX + toX) / 2;
        const controlY1 = fromY;
        const controlY2 = toY;

        const pathD = `M ${fromX},${fromY} C ${midX},${controlY1} ${midX},${controlY2} ${toX},${toY}`;

        return (
          <g key={index}>
            <motion.path
              d={pathD}
              stroke="blue"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <text x={midX} y={(fromY + toY) / 2} fontSize="12" fill="black" textAnchor="middle" dy="-5">
              {conn.from.id} ➝ {conn.to.id}
            </text>
          </g>
        );
      })}

      {tempConnection && (
        (() => {
          const fromEl = elements.find(el => el.id === tempConnection.id) || fixedBlocks.find(block => block.id === tempConnection.id);
          if (!fromEl) return null;

          const fromX = fromEl.x ? fromEl.x + 60 : parseInt(fromEl.left) + 60;
          const fromY = fromEl.y ? fromEl.y + 30 : parseInt(fromEl.top) + 20;

          return (
            <motion.path
              d={`M ${fromX},${fromY} 
                  C ${(mousePosition.x + fromX) / 2},${fromY} 
                  ${(mousePosition.x + fromX) / 2},${mousePosition.y} 
                  ${mousePosition.x},${mousePosition.y}`}
              stroke="red"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          );
        })()
      )}
    </svg>
  );
};

export default GateConnections;
