import { CallTracker } from "assert";
import React from "react";
import "./App.css";
import Column from "./components/column/column";

function App() {
  return (
    <div className="App">
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
}

export default App;
