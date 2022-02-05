import React, {useState} from "react";
import styled from "styled-components";
import Column from "./components/column";
import Card from "./components/card";
import Welcome from "./components/welcome";
import {dataType} from "./components/services";

function App() {
    let emptyData: dataType;
    emptyData = {
        columns: {},
    };
    const [userName, changeUserName] = useState("");
    const [trelloData, setTrelloData] = useState(emptyData);

    return (
        <Main>
            <Column/>
            <Column/>
            <Column/>
            <Column/>
            <Card/>
            <Welcome changeUserName={changeUserName} setData={setTrelloData}/>
        </Main>
    );
}

export default App;

const Main = styled.div`
    backgroundColor: #282c34;
    minHeight: 100vh;
    display: flex;
    flexDirection: row;
    alignItems: flex-start;
    justifyContent: flex-start;
    color: #172b4d;
    fontSize: 14px;
    fontWeight: 400;
    lineHeight: 20px;
    width: fit-content;
`;