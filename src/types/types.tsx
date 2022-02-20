import React, {Dispatch, SetStateAction} from "react";

export type DataType = {
    columns: ColumnsType[];
    cards: CardType[];
    comments: CommentType[];
}

export type  ColumnsType = {
    id: number;
    title: string;
}

export type CardType = {
    id: number;
    name: string;
    text: string;
    user: string;
    columnId: number;
}

export type CommentType = {
    id: number;
    text: string;
    user: string;
    cardId: number;
}

export type CardModalType = {
    card: CardType;
    isNew: boolean
}

export type ContxtType = {
    userName: string,
    trelloData: DataType,
    setTrelloData: Dispatch<SetStateAction<DataType>>,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>,
    setCardModal:  Dispatch<SetStateAction<CardModalType>>,
    setUserName: Dispatch<SetStateAction<string>>,
    setModalContent: Dispatch<SetStateAction<React.FC>>,
    isModalVisible: boolean,
    cardModal: CardModalType
}