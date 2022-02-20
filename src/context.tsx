import React from 'react'
import {DataType} from "./types";
import {settings} from "./settings";
import {ContxtType} from "./types/types";

const defaultContext: ContxtType = {
    userName: "",
    trelloData: settings.emptyData as DataType,
    setTrelloData: ()=>{},
    setIsModalVisible: ()=>{},
    setCardModal: ()=>{},
    setUserName: ()=>{},
    setModalContent: ()=>{},
    isModalVisible: false,
    cardModal: {card:settings.cardModal.emptyCard, isNew:true}
}
export const Context = React.createContext(defaultContext)

