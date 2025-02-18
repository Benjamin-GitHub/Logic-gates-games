import React from "react";
//import "./logic_gate_styles.css";

const TruthTable = ({ example, setExampleIndex, totalExamples }) => {
  return (
    <div className="card">
      <h2>{example.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Input A</th>
            <th>Input B</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {example.truthTable.map((row, index) => (
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
          onClick={() => setExampleIndex((prev) => Math.min(totalExamples - 1, prev + 1))}
          className="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TruthTable;
