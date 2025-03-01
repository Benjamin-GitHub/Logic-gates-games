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

        const isFromFixedBlock = fixedBlocks.some(block => block.id === conn.from.id);
        const isToFixedBlock = fixedBlocks.some(block => block.id === conn.to.id);

        const fromX = isFromFixedBlock 
            ? parseInt(fromEl.left) + 60 
            : fromEl.x + 69;

          const fromY = isFromFixedBlock
            ? parseInt(fromEl.top) + (fromEl.id === "input1" ? 100 : 220)
            : fromEl.y + 39;

          const inputIndex = conn.to.portIndex || 0;

          let toX = isToFixedBlock 
            ? parseInt(toEl.top) + 515
            : toEl.x + 12;

          let toY = isToFixedBlock 
            ? parseInt(toEl.top) + 160 
            : toEl.y + (toGateData.inputs === 1 ? 39 : inputIndex === 0 ? 33 : 49);
            
        const midX = (fromX + toX) / 2;
        const controlY1 = fromY;
        const controlY2 = toY;

        const pathD = `M ${fromX},${fromY} C ${midX},${controlY1} ${midX},${controlY2} ${toX},${toY}`;

        const fromGate = elements.find(el => el.id === conn.from.id) || fixedBlocks.find(block => block.id === conn.from.id);
        const toGate = elements.find(el => el.id === conn.to.id) || fixedBlocks.find(block => block.id === conn.to.id);

        const fromName = fromGate ? (fromGate.type || fromGate.label || "Unknown") : "Unknown";
        const toName = toGate ? (toGate.type || toGate.label || "Unknown") : "Unknown";

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
              {fromName} ➝ {toName}
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
