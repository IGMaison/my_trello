import React, {useState} from "react";
import Enter from "./components/enter";
import {Context} from "./context";
import Dashboard from "./components/dashboard";
import {DataType} from "./types";
import {settings} from "./settings";
import {StorageService} from "./components/services";
import {CardModalType} from "./types/types";
import Modal from "./components/modal";

export let storageService = new StorageService(localStorage);

function App() {
    const [userName, setUserName] = useState<string>("");
    const [trelloData, setTrelloData] = useState<DataType>(settings.emptyData);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
    const [cardModal, setCardModal] = useState<CardModalType>({card: settings.cardModal.emptyCard, isNew: true});
    const [modalContent, setModalContent] = useState<React.FC>(()=><Enter/>)
    storageService.set(setTrelloData)


    return (
        <Context.Provider
            value={{
                userName,
                trelloData,
                setTrelloData,
                setIsModalVisible,
                setCardModal,
                setModalContent,
                isModalVisible,
                cardModal,
                setUserName
            }}
        >
            <Dashboard trelloData={trelloData}/>
            {isModalVisible && <Modal>{modalContent}</Modal>}
        </Context.Provider>
    );
}

export default App;
