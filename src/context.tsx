import React from 'react'
import {DataType} from "./types";
import {settings} from "./settings";
import {ContxtType} from "./types/types";

const defaultContext: ContxtType = {
    userName: "",
    trelloData: settings.emptyData as DataType,
    setTrelloData: ()=>{},
    setIsCardVisible: ()=>{},
    setCardModal: ()=>{},
    isCardVisible: false,
    cardModal: {card:settings.card.emptyCard, columnId:0, isNew:true}
}
export const Context = React.createContext(defaultContext)

