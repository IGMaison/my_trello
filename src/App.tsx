import { CallTracker } from "assert";
import React from "react";
import "./App-.css";
import Column from "./components/column/column";
import Card from "./components/card";
import Enter from "./components/enter";
import {inspect} from "util";

function App() {
    return (
        <div style={{...app}}>
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

const app: any = {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: '#172b4d',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    width: 'fit-content',
};