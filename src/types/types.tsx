import {Dispatch, SetStateAction} from "react";

export type DataType = {
    columns: ColumnsType[]
}

export type  ColumnsType = {
    id: number;
    title: string;
    cards: CardType[]
}

export type CardType = {
    id: number;
    name: string;
    text: string;
    user: string;
    comments: CommentType[]
}

export type CommentType = {
    id: number;
    text: string;
    user: string
}

export type CardModalType = {
    card: CardType;
    columnId: number,
    isNew: boolean
}

export type ContxtType = {
    userName: string,
    trelloData: DataType,
    setTrelloData: Dispatch<SetStateAction<DataType>>,
    setIsCardVisible: Dispatch<SetStateAction<boolean>>,
    setCardModal:  Dispatch<SetStateAction<CardModalType>>,
    isCardVisible: boolean,
    cardModal: CardModalType
}