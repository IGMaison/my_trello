import React, { useState } from "react";
import Welcome from "./components/welcome";
import {DataType, storageService} from "./components/services";
import { Context } from "./context";
import Dashboard from "./components/dashboard";
import {CardContent} from "./components/services/storage_service";

export type ContxtType = {
    userName: string,
    trelloData: DataType,
    setTrelloData: (x:DataType)=>void,
    setIsCardVisible: (x:boolean)=>void,
    setCardContent: (x:CardContent)=>void,
    isCardVisible: boolean,
    cardContent: CardContent,
}

function App() {
  const [userName, changeUserName] = useState<string>("");
  const [trelloData, setTrelloData] = useState<DataType>(storageService.emptyData);
  const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
  const [cardContent, setCardContent] = useState<CardContent>({
    comments: [],
    id: 0,
    name: "",
    text: "",
    user: "",
  });



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
