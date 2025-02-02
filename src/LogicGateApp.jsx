import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const gates = ["AND", "OR", "NOT", "XOR", "NAND", "NOR"];

export default function LogicGateApp() {
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);
  const [exampleIndex, setExampleIndex] = useState(0);

  const addGate = (gate) => {
    setElements([...elements, { id: Date.now(), type: gate, x: 50, y: 50, inputs: [], output: null }]);
  };

  const moveGate = (id, x, y) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const addConnection = (from, to) => {
    setConnections([...connections, { from, to }]);
  };

  const examples = [
    { name: "Example 1", truthTable: [[0, 0, 0], [0, 1, 1]] },
    { name: "Example 2", truthTable: [[1, 0, 1], [1, 1, 0]] },
  ];

  return (
    <div className="p-5 flex flex-col gap-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">{examples[exampleIndex].name}</h2>
          <table className="mt-2 border w-full">
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
                    <td key={i} className="border p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => setExampleIndex((prev) => Math.max(0, prev - 1))}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setExampleIndex((prev) =>
                  Math.min(examples.length - 1, prev + 1)
                )
              }
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <div className="w-1/4 p-2 border">
          <h3 className="font-bold">Gates</h3>
          {gates.map((gate) => (
            <Button key={gate} onClick={() => addGate(gate)} className="block mt-2">
              {gate}
            </Button>
          ))}
        </div>

        <div className="flex-1 border relative h-[500px]">
          {elements.map((el) => (
            <Draggable
              key={el.id}
              defaultPosition={{ x: el.x, y: el.y }}
              onStop={(e, data) => moveGate(el.id, data.x, data.y)}
            >
              <motion.div className="p-2 border bg-gray-200 rounded absolute">
                {el.type}
                <button 
                  className="ml-2 p-1 bg-blue-500 text-white rounded"
                  onClick={() => addConnection(el.id, elements[0]?.id)}
                >
                  Connect
                </button>
              </motion.div>
            </Draggable>
          ))}
          <svg className="absolute w-full h-full">
            {connections.map((conn, index) => {
              const fromEl = elements.find((el) => el.id === conn.from);
              const toEl = elements.find((el) => el.id === conn.to);
              return fromEl && toEl ? (
                <line
                  key={index}
                  x1={fromEl.x + 20}
                  y1={fromEl.y + 20}
                  x2={toEl.x + 20}
                  y2={toEl.y + 20}
                  stroke="black"
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
