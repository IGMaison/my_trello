import React, { useState } from "react";
import Welcome from "./components/welcome";
import { Context } from "./context";
import Dashboard from "./components/dashboard";
import {DataType} from "./types";
import {settings} from "./settings";

export type ContxtType = {
    userName: string,
    trelloData: DataType,
    setTrelloData: (x:DataType)=>void,
    setIsCardVisible: (x:boolean)=>void,
    setCardContent: (x:number)=>void,
    isCardVisible: boolean,
    cardContent: number,
}

function App() {
  const [userName, changeUserName] = useState<string>("");
  const [trelloData, setTrelloData] = useState<DataType>(settings.emptyData);
  const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
  const [cardContent, setCardContent] = useState<number>(0);




  return (
    <Context.Provider
      value={{
        userName,
        trelloData,
        setTrelloData,
        setIsCardVisible,
        setCardContent,
        isCardVisible,
        cardContent,
      }}
    >
          <Dashboard cardContent={cardContent} trelloData={trelloData}/>
      <Welcome changeUserName={changeUserName} setData={setTrelloData} />
    </Context.Provider>
  );
}

export default App;
