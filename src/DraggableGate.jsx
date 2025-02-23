import React from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const DraggableGate = ({ gate, gateRef, moveGate, handleGateClick, isDrawing, gateIcons, draggingDisabled }) => {
  return (
    <Draggable 
      key={gate.id} 
      nodeRef={gateRef} 
      defaultPosition={{ x: gate.x, y: gate.y }} 
      onStop={(e, data) => moveGate(gate.id, data.x, data.y)}
      disabled={draggingDisabled} // Disable dragging when in draw mode
    >
      <motion.div 
        ref={gateRef} 
        className="draggable-gate" 
        onClick={(event) => handleGateClick(gate.id, event)}
        style={{ cursor: isDrawing ? "crosshair" : "grab" }}
      >
        <img 
          src={gateIcons[gate.type].src} 
          alt={`${gate.type} Gate`} 
          width={60} height={60} 
        />
      </motion.div>
    </Draggable>
  );
};

export default DraggableGate;
