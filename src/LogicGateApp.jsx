import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import "./logic_gate_styles.css";
import andGate from "./assets/and.svg";
import notGate from "./assets/not.svg";
import nandGate from "./assets/nand.svg";
import orGate from "./assets/or.svg";

const gateIcons = {
  AND: { src: andGate, inputs: 2, outputs: 1 },
  NOT: { src: notGate, inputs: 1, outputs: 1 },
  OR: { src: orGate, inputs: 2, outputs: 1 },
  NAND: { src: nandGate, inputs: 2, outputs: 1 },
};

const examples = [
  { name: "Example 1", truthTable: [[0, 0, 0], [0, 1, 1]] },
  { name: "Example 2", truthTable: [[1, 0, 1], [1, 1, 0]] },
];

export default function LogicGateApp() {
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);
  const gateRefs = useRef({});
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [exampleIndex, setExampleIndex] = useState(0);

  const addGate = (gate) => {
    const id = Date.now();
    gateRefs.current[id] = React.createRef();
    const canvas = document.querySelector(".canvas");
    const canvasRect = canvas.getBoundingClientRect();

    const defaultX = Math.max(10, Math.min(canvasRect.width - 50, canvasRect.width / 2));
    const defaultY = Math.max(10, Math.min(canvasRect.height - 50, canvasRect.height / 2));
    
    setElements([...elements, { id, type: gate, x: defaultX, y: defaultY, inputs: [], output: null }]);
  };

  const moveGate = (id, x, y) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const handleGateDoubleClick = (id, portType, portIndex) => {
    if (connectingFrom === null) {
      setConnectingFrom({ id, portType, portIndex });
    } else {
      if (connectingFrom.id !== id) {
        setConnections([...connections, { from: connectingFrom, to: { id, portType, portIndex } }]);
      }
      setConnectingFrom(null);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{examples[exampleIndex].name}</h2>
        <table>
          <thead>
            <tr>
              <th>Input A</th>
              <th>Input B</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {examples[exampleIndex].truthTable.map((row, index) => (
              <tr key={index}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button
            onClick={() => setExampleIndex((prev) => Math.max(0, prev - 1))}
            className="button"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setExampleIndex((prev) =>
                Math.min(examples.length - 1, prev + 1)
              )
            }
            className="button"
          >
            Next
          </button>
        </div>
      </div>

      <div className="logic-gate-container">
        <div className="gate-selector">
          <h3>Logic Gates</h3>
          {Object.keys(gateIcons).map((gate) => (
            <button key={gate} onClick={() => addGate(gate)} className="logic-gate">
              <img src={gateIcons[gate].src} alt={`${gate} Gate`} width={40} height={40} />
            </button>
          ))}
        </div>

        <div className="canvas">
          {elements.map((el) => {
            if (!gateRefs.current[el.id]) {
              gateRefs.current[el.id] = React.createRef();
            }
            const gateData = gateIcons[el.type];
            return (
              <Draggable
                key={el.id}
                nodeRef={gateRefs.current[el.id]}
                defaultPosition={{ x: el.x, y: el.y }}
                onStop={(e, data) => moveGate(el.id, data.x, data.y)}
              >
                <motion.div
                  ref={gateRefs.current[el.id]}
                  className="draggable-gate"
                  onDoubleClick={() => handleGateDoubleClick(el.id, "output", 0)}
                >
                  <img src={gateData.src} alt={`${el.type} Gate`} width={60} height={60} />
                </motion.div>
              </Draggable>
            );
          })}
          <svg className="connections">
            {connections.map((conn, index) => {
              const fromEl = elements.find((el) => el.id === conn.from.id);
              const toEl = elements.find((el) => el.id === conn.to.id);
              return fromEl && toEl ? (
                <line
                  key={index}
                  x1={fromEl.x + 30}
                  y1={fromEl.y + 30 + conn.from.portIndex * 10}
                  x2={toEl.x + 30}
                  y2={toEl.y + 30 + conn.to.portIndex * 10}
                  stroke="blue"
                  strokeWidth="2"
                />
              ) : null;
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}