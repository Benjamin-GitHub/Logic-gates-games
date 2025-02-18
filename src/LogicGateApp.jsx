import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import "./logic_gate_styles.css";
import andGate from "./assets/and.svg";
import notGate from "./assets/not.svg";
import nandGate from "./assets/nand.svg";
import orGate from "./assets/or.svg";
import norGate from "./assets/nor.svg";

import TruthTable from "./TruthTable";
import examples from "./examplesData";

const gateIcons = {
  AND: { src: andGate, inputs: 2, outputs: 1 },
  NOT: { src: notGate, inputs: 1, outputs: 1 },
  OR: { src: orGate, inputs: 2, outputs: 1 },
  NAND: { src: nandGate, inputs: 2, outputs: 1 },
  NOR: { src: norGate, inputs: 2, outputs: 1 },
};

export default function LogicGateApp() {
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);
  const gateRefs = useRef({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempConnection, setTempConnection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [exampleIndex, setExampleIndex] = useState(0);
  const [lastGatePosition, setLastGatePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const canvas = document.querySelector(".canvas");
      if (!canvas) return;
  
      const canvasRect = canvas.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      });
    };
  
    if (isDrawing) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDrawing]);

  const addGate = (gate) => {
    const id = Date.now();
    gateRefs.current[id] = React.createRef();
    const canvas = document.querySelector(".canvas");
    const canvasRect = canvas.getBoundingClientRect();
    const gateWidth = 70; // Approximate gate width
    const gateHeight = 70; // Approximate gate height
    const padding = 20; // Space between gates
  
    let newX = lastGatePosition.x + gateWidth + padding;
    let newY = lastGatePosition.y;
  
    // If the new gate will go out of canvas width, wrap to next row
    if (newX + gateWidth > canvasRect.width) {
      newX = 50; // Reset X position
      newY += gateHeight + padding; // Move to the next row
    }
  
    // If the new gate goes out of canvas height, restart from the first position
    if (newY + gateHeight > canvasRect.height) {
      newX = 50;
      newY = 50;
    }
  
    setElements([...elements, { id, type: gate, x: newX, y: newY, inputs: [], output: null }]);
    setLastGatePosition({ x: newX, y: newY }); // Update last position
  };

  const moveGate = (id, x, y) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const handleGateClick = (id, event) => {
    if (!isDrawing) return;

    const gateElement = gateRefs.current[id]?.current;
    if (!gateElement) return;

    const rect = gateElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const gateWidth = rect.width;

    const gateData = gateIcons[elements.find(el => el.id === id).type];

    if (!tempConnection) {
      if (clickX > gateWidth / 2) {
        setTempConnection({ id, portType: "output", portIndex: 0 });
      }
    } else {
      if (clickX < gateWidth / 2) {
        let inputIndex = 0;
        if (gateData.inputs === 2) {
          const clickY = event.clientY - rect.top;
          inputIndex = clickY < rect.height / 2 ? 0 : 1;
        }

        setConnections([...connections, { from: tempConnection, to: { id, portType: "input", portIndex: inputIndex } }]);
        setTempConnection(null);
        setIsDrawing(false);
      }
    }
  };

  const resetCanvas = () => {
    setElements([]);
    setConnections([]);
  };

  return (
    <div className="container">
      <TruthTable
        example={examples[exampleIndex]}
        setExampleIndex={setExampleIndex}
        totalExamples={examples.length}
      />

      <div className="logic-gate-container">
        <div className="gate-selector">
          <h3>Logic Gates</h3>
          {Object.keys(gateIcons).map((gate) => (
            <button key={gate} onClick={() => addGate(gate)} className="logic-gate">
              <img src={gateIcons[gate].src} alt={`${gate} Gate`} width="50" height="30" style={{ objectFit: "contain" }} />
            </button>
          ))}
          <button onClick={() => setIsDrawing(true)} className="logic-gate-line">
            🔗 Draw Connection
          </button>
        </div>

        <div className="canvas">
          <button className="refresh-button" onClick={resetCanvas}>
            🔄 Try Again
          </button>

          {elements.map((el) => (
            <Draggable key={el.id} nodeRef={gateRefs.current[el.id]} defaultPosition={{ x: el.x, y: el.y }} onStop={(e, data) => moveGate(el.id, data.x, data.y)}>
              <motion.div 
                ref={gateRefs.current[el.id]} 
                className="draggable-gate" 
                onClick={(event) => handleGateClick(el.id, event)}
                style={{ cursor: isDrawing ? "crosshair" : "grab" }}
              >
                <img 
                  src={gateIcons[el.type].src} 
                  alt={`${el.type} Gate`} 
                  width={60} height={60} 
                />
              </motion.div>
            </Draggable>
          ))}

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

              // Compute control points for smooth curve (Bezier Curve)
              const midX = (fromX + toX) / 2; // Midpoint for curve
              const controlY1 = fromY; // Control point 1 at output height
              const controlY2 = toY; // Control point 2 at input height

              // Define the curved connection path using a cubic Bezier curve
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
        </div>
      </div>
    </div>
  );
}
