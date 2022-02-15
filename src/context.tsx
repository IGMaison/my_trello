import React from 'react'
import {DataType} from "./types";
import {settings} from "./settings";

type CardContentType = {cardId: number; isCardVisible: boolean}

const defaultContext = {
    userName: "",
    trelloData: settings.emptyData as DataType,
    setTrelloData: (x:DataType)=>{},
    setIsCardVisible: (x:boolean)=>{},
    setCardContent: (x: number)=>{},
    isCardVisible: false,
    cardContent: 0
}
export const Context = React.createContext(defaultContext)

