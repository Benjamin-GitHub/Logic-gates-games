import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const IntroPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div className="intro-container">
      <h1>Welcome to Logic Gate Simulator</h1>
      <p>Build, visualize, and test logic circuits in an interactive environment.</p>
      <p>Logic Gate Simulator
The Logic Gate Simulator is an interactive tool designed to help users visualize and understand digital logic circuits. Whether you're a student, educator, or electronics enthusiast, this application allows you to build, test, and analyze logical circuits in a user-friendly environment.

Key Features:
✅ Drag & Drop Logic Gates – Easily add AND, OR, NOT, NAND, NOR gates to the workspace.
✅ Interactive Connections – Connect gates, inputs, and outputs dynamically.
✅ Truth Table Integration – View real-time logic evaluations for each circuit.
✅ Fixed Input & Output Blocks – Predefined IN 1, IN 2, and OUT blocks for structured circuit design.
✅ Fully Draggable Components – Position logic gates freely to create complex circuits.
✅ Responsive & Scrollable Canvas – Works on different screen sizes with smooth navigation.
✅ Reset & Modify – Easily clear the canvas and reconfigure your circuit as needed.

How to Use:
1️⃣ Select a Logic Gate from the left panel and place it in the workspace.
2️⃣ Click “Draw Connection” and connect input/output nodes between gates.
3️⃣ Observe the Truth Table at the top to see how inputs affect the output.
4️⃣ Modify & Test different configurations to explore Boolean logic in action.

🚀 Perfect for learning and experimenting with logic circuits!</p>
      <button className="start-button" onClick={() => navigate("/app")}>
        🚀 Start
      </button>
    </div>
  );
};

export default IntroPage;
