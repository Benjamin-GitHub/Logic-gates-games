import React from "react";
import gateIcons from "./assets/GateIcons";

const GateSelector = ({ addGate, setIsDrawing, setDraggingDisabled }) => {
    return (
      <div className="gate-selector">
        <h3>Logic Gates</h3>
        {Object.keys(gateIcons).map((gate) => (
          <button key={gate} onClick={() => addGate(gate)} className="logic-gate">
            <img
              src={gateIcons[gate].src}
              alt={`${gate} Gate`}
              width="50"
              height="30"
              style={{ objectFit: "contain" }}
            />
          </button>
        ))}
        <button 
            onClick={() => {
                setIsDrawing((prev) => {
                if (prev) {
                    setDraggingDisabled(false); // Enable dragging when exiting draw mode
                } else {
                    setDraggingDisabled(true); // Disable dragging when entering draw mode
                }
                return !prev;
                });
            }} 
            className="logic-gate-line"
            >
            🔗 Draw Connection
        </button>
      </div>
    );
  };
  
  export default GateSelector;
