import React from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import GateConnections from "./GateConnections";


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
        <Draggable 
          key={el.id} 
          nodeRef={gateRefs.current[el.id]} 
          defaultPosition={{ x: el.x, y: el.y }} 
          onStop={(e, data) => moveGate(el.id, data.x, data.y)}
          disabled={draggingDisabled} // Disable dragging when in draw mode
        >
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
