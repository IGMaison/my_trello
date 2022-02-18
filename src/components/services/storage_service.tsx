import {CardType, ColumnsType, CommentType, DataType} from "../../types";
import {settings} from "../../settings";
import {Dispatch, SetStateAction} from "react";

export class StorageService {
    static baseName = settings.baseName;
    private static setTrelloData: Dispatch<SetStateAction<DataType>>;

    trelloStorage: Storage;

    constructor(storage: Storage) {
        this.trelloStorage = storage;
    }

    set(setData: Dispatch<SetStateAction<DataType>>) {
        StorageService.setTrelloData = setData
    }

    initTrelloData() {
        if (StorageService.baseName in this.trelloStorage) {
            StorageService.setTrelloData(() => JSON.parse(this.trelloStorage[StorageService.baseName]))
            return
        }
        StorageService.setTrelloData(() => this.setTrelloStorage(settings.emptyData));
    }

    public setTrelloStorage(base: DataType): DataType {

        this.trelloStorage[StorageService.baseName] = JSON.stringify(base)
        return base;
    }

    public editColumnTitle(columnId: number, title: string, trelloData: DataType): void {
        let columnArrIdx = trelloData.columns.findIndex((column: ColumnsType) => column.id === columnId)
        StorageService.setTrelloData(((): DataType => {
            trelloData.columns[columnArrIdx].title = title;
            return this.setTrelloStorage(trelloData)
        })())
    }

    public deleteCard(columnId: number, cardId: number, trelloData: DataType): DataType {
        StorageService.setTrelloData(((): DataType => {
            let columnArrIdx = trelloData.columns.findIndex((column: ColumnsType) => column.id === columnId)
            trelloData.columns[columnArrIdx].cards = trelloData.columns[columnArrIdx].cards.filter((card) => card.id !== cardId)
            return this.setTrelloStorage(trelloData)
        })())
        return trelloData
    }

    public SaveCard(columnId: number, editedCard: CardType, trelloData: DataType): void {
        StorageService.setTrelloData(((): DataType => {
            let columnArrIdx = trelloData.columns.findIndex((column: ColumnsType) => column.id === columnId)
            this.deleteCard(columnId, editedCard.id, trelloData).columns[columnArrIdx].cards.push(editedCard);
            trelloData.columns[columnArrIdx].cards = trelloData.columns[columnArrIdx].cards.sort((a, b) => a.id - b.id);
            return this.setTrelloStorage(trelloData)
        })())
    }

    public saveNewComment(columnId: number, cardId: number, comment: CommentType, trelloData: DataType): void {

        StorageService.setTrelloData(((): DataType => {
            let columnArrIdx = trelloData.columns.findIndex((column: ColumnsType) => column.id === columnId)
            let cardArrIdx = trelloData.columns[columnArrIdx].cards.findIndex((card: CardType) => card.id === cardId)
            trelloData.columns[columnArrIdx].cards[cardArrIdx].comments.push(comment);
            trelloData.columns[columnArrIdx].cards[cardArrIdx].comments = trelloData.columns[columnArrIdx].cards[cardArrIdx].comments.sort((a, b) => b.id - a.id);
            return this.setTrelloStorage(trelloData)
        })());
    }

    public deleteComment(columnId: number, cardId: number, commentId: number, trelloData: DataType): void {
        StorageService.setTrelloData(((): DataType => {
            let columnArrIdx = trelloData.columns.findIndex((column: ColumnsType) => column.id === columnId);
            let cardArrIdx = trelloData.columns[columnArrIdx].cards.findIndex((card: CardType) => card.id === cardId);
            trelloData.columns[columnArrIdx].cards[cardArrIdx].comments = trelloData.columns[columnArrIdx].cards[cardArrIdx].comments.filter((comment) => comment.id !== commentId);
            return this.setTrelloStorage(trelloData)
        })());
    }

    public editComment(columnId: number, cardId: number, commentId: number, comment: CommentType, trelloData: DataType) {
        this.deleteComment(columnId, cardId, commentId, trelloData)
        this.saveNewComment(columnId, cardId, comment, trelloData)
    }
}
