import React, { useState, useRef, useEffect } from "react";
import "./logic_gate_styles.css";

import TruthTable from "./TruthTable";
import examples from "./examplesData";
import GateSelector from "./GateSelector";
import gateIcons from "./assets/GateIcons";
import LogicGateCanvas from "./LogicGateCanvas";


export default function LogicGateApp() {
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);
  const gateRefs = useRef({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [tempConnection, setTempConnection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [exampleIndex, setExampleIndex] = useState(0);
  const [lastGatePosition, setLastGatePosition] = useState({ x: 50, y: 50 });
  const [draggingDisabled, setDraggingDisabled] = useState(false);

  const fixedBlocks = [
    { id: "input1", label: "IN 1", type: "input", top: "20%", left: "10px" },
    { id: "input2", label: "IN 2", type: "input", top: "50%", left: "10px" },
    { id: "output", label: "OUT", type: "output", top: "35%", right: "10px" }
  ];

  const handleBlockClick = (id) => {
    if (!isDrawing) return;
  
    if (!tempConnection) {
      setTempConnection({ id, portType: "output", portIndex: 0 });
    } else {
      setConnections([...connections, { from: tempConnection, to: { id, portType: "input", portIndex: 0 } }]);
      setTempConnection(null);
      setIsDrawing(false);
      setDraggingDisabled(false);
    }
  };
  
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
    const gateWidth = 70;
    const gateHeight = 70; 
    const padding = 20;
  
    let newX = lastGatePosition.x + gateWidth + padding;
    let newY = lastGatePosition.y;
  
    if (newX + gateWidth > canvasRect.width) {
      newX = 50;
      newY += gateHeight + padding;
    }
  
    if (newY + gateHeight > canvasRect.height) {
      newX = 50;
      newY = 50;
    }
  
    setElements([...elements, { id, type: gate, x: newX, y: newY, inputs: [], output: null }]);
    setLastGatePosition({ x: newX, y: newY });
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
        setDraggingDisabled(false);
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
        <GateSelector addGate={addGate} setIsDrawing={setIsDrawing} setDraggingDisabled={setDraggingDisabled} />

        <LogicGateCanvas 
          elements={elements} 
          gateRefs={gateRefs} 
          moveGate={moveGate} 
          handleGateClick={handleGateClick} 
          isDrawing={isDrawing} 
          connections={connections} 
          tempConnection={tempConnection} 
          mousePosition={mousePosition} 
          resetCanvas={resetCanvas} 
          gateIcons={gateIcons} 
          draggingDisabled={draggingDisabled} 
          fixedBlocks={fixedBlocks} 
          handleBlockClick={handleBlockClick} 
        />
      </div>
    </div>
  );
}
