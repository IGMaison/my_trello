import { CallTracker } from "assert";
import React from "react";
import "./App.css";
import Column from "./components/column/column";
import Card from "./components/card";
import Enter from "./components/enter";

function App() {
    return (
        <div className="App">
            <Column />
            <Column />
            <Column />
            <Column />
            <Card />
            <Enter />
        </div>
    );
}

export default App;