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
    //TODO: если стейт объект,то типизируем
    const [cardContent, setCardContent] = useState({
            comments: [],
            columnId: "",
            id: 0,
            name: "",
            text: "",
            user: ""
        }
    );

    //TODO: в App должны происходить глобальные вещи, т.е. в нашем случае это контекст и рендер компонента Dashboard к пр.
    return (
        <Context.Provider
            value={{
                userName,
                trelloData,
                setTrelloData,
                setCardStatus,
                setCardContent,
                cardStatus,
            }}>{console.log(userName, trelloData)}
            {/* TODO: Что тут забыл console.log ?*/}
            <Main>
                {Object.keys(trelloData.columns).length > 0 ?
                    Object.keys(trelloData.columns).map(
                        (key) => <Column key={key} id={key} columnContent={trelloData.columns[key]}/>
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

//TODO: я так понимаю ты стили откуда то копировал и поэтому они не в правильном написании... Перепиши стили, и старайся их писать сам
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
