import React from 'react'
import {DataType, storageService} from "./components/services";
import {CardContent} from "./components/services/storage_service";

const defaultContext = {
    userName: "",
    trelloData: storageService.emptyData,
    setTrelloData: (x:DataType)=>{},
    setIsCardVisible: (x:boolean)=>{},
    setCardContent: (x: CardContent)=>{},
    isCardVisible: false,
    cardContent: {
        comments: [{ id: 0, text: "", user: "" }],
        id: 0,
        name: "",
        text: "",
        user: "",
    }
}
export const Context = React.createContext(defaultContext)

