import React from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import GateConnections from "./GateConnections";
import DraggableGate from "./DraggableGate";


const LogicGateCanvas = ({ 
  elements, 
  gateRefs, 
  moveGate, 
  handleGateClick, 
  isDrawing, 
  connections, 
  tempConnection, 
  mousePosition, 
  resetCanvas, 
  gateIcons, 
  draggingDisabled
}) => {
  return (
    <div className="canvas">
      <button className="refresh-button" onClick={resetCanvas}>
        🔄 Try Again
      </button>

      {elements.map((el) => (
        <DraggableGate 
          key={el.id} 
          gate={el} 
          gateRef={gateRefs.current[el.id]} 
          moveGate={moveGate} 
          handleGateClick={handleGateClick} 
          isDrawing={isDrawing} 
          gateIcons={gateIcons} 
          draggingDisabled={draggingDisabled} 
        />
      ))}

      <GateConnections 
        elements={elements} 
        connections={connections} 
        tempConnection={tempConnection} 
        mousePosition={mousePosition} 
        gateIcons={gateIcons} 
      />
    </div>
  );
};

export default LogicGateCanvas;
