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