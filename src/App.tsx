import React, {useState} from "react";
import styled from "styled-components";
import Column from "./components/column";
import Card from "./components/card";
import Welcome from "./components/welcome";
import {emptyData} from "./components/services";
import {Context} from "./context";

function App() {

    const [userName, changeUserName] = useState("");
    const [trelloData, setTrelloData] = useState(emptyData);
    const [cardStatus, setCardStatus] = useState(false);
    const [cardContent, setCardContent] = useState({
            comments: [],
            id: 0,
            name: "name0",
            text: "text0",
            user: "userName"
        }
    );

    return (
        <Context.Provider
            value={{
                userName,
                trelloData,
                setTrelloData,
                setCardStatus,
                setCardContent
            }}>
            <Main>{console.log("td", trelloData)}
                {Object.keys(trelloData.columns).length > 0 ?
                    Object.keys(trelloData.columns).map(
                        (key) => <Column key={key} columnContent={trelloData.columns[key]}/>
                    )
                    :
                    <>NOTHING TO SHOW</>}
                <Card cardStatus={cardStatus} {...cardContent} setCardContent={setCardContent}
                      setCardStatus={setCardStatus}/>
                <Welcome changeUserName={changeUserName} setData={setTrelloData}/>
            </Main>
        </Context.Provider>
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