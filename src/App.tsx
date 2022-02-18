import React, {useState} from "react";
import Welcome from "./components/welcome";
import {Context} from "./context";
import Dashboard from "./components/dashboard";
import {DataType} from "./types";
import {settings} from "./settings";
import {StorageService} from "./components/services";
import {CardModalType} from "./types/types";

export let storageService = new StorageService(localStorage);

function App() {
    const [userName, changeUserName] = useState<string>("");
    const [trelloData, setTrelloData] = useState<DataType>(settings.emptyData);
    const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
    const [cardModal, setCardModal] = useState<CardModalType>({card: settings.card.emptyCard, columnId: 0, isNew: true});
    storageService.set(setTrelloData)


    return (
        <Context.Provider
            value={{
                userName,
                trelloData,
                setTrelloData,
                setIsCardVisible,
                setCardModal,
                isCardVisible,
                cardModal
            }}
        >
            <Dashboard trelloData={trelloData}/>
            <Welcome changeUserName={changeUserName} />
        </Context.Provider>
    );
}

export default App;
