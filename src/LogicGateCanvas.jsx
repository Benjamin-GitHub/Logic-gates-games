import React from "react";
import { useNavigate } from "react-router-dom";
import DraggableGate from "./DraggableGate";
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
  draggingDisabled,
  fixedBlocks,
  handleBlockClick
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="canvas">
      <button className="refresh-button" onClick={resetCanvas}>
        🔄 Try Again
      </button>
      <button className="back-button" onClick={() => navigate("/")}>🔙 Back to Start</button>

      {/* Fixed Input Blocks */}
      {fixedBlocks.map((block) => (
        <div 
          key={block.id} 
          className={`fixed-block ${block.type}-block`} 
          style={{ top: block.top, left: block.left, right: block.right }}
          onClick={() => handleBlockClick(block.id)}
        >
          {block.label}
        </div>
      ))}

      {/* Render Draggable Gates */}
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

      {/* Render Connections */}
      <GateConnections 
        elements={elements || []}
        connections={connections || []}
        tempConnection={tempConnection}
        mousePosition={mousePosition}
        gateIcons={gateIcons}
        fixedBlocks={fixedBlocks || []}
      />
    </div>
  );
};

export default LogicGateCanvas;
