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

    public deleteCard(cardId: number, trelloData: DataType): DataType {
        StorageService.setTrelloData(((): DataType => {
            trelloData.cards = trelloData.cards.filter((card) => card.id !== cardId)
            trelloData.comments = trelloData.comments.filter((comment) => comment.cardId !== cardId);
            return this.setTrelloStorage(trelloData)
        })())
        return trelloData
    }

    public SaveCard(editedCard: CardType, trelloData: DataType): void {
        StorageService.setTrelloData(((): DataType => {
            this.deleteCard(editedCard.id, trelloData).cards.push(editedCard)
            trelloData.cards = trelloData.cards.sort((a, b) => a.id - b.id);
            return this.setTrelloStorage(trelloData)
        })())
    }

    public saveNewComment(cardId: number, comment: CommentType, trelloData: DataType): void {
        StorageService.setTrelloData(((): DataType => {
            trelloData.comments.push(comment);
            trelloData.comments = trelloData.comments.sort((a, b) => b.id - a.id);
            return this.setTrelloStorage(trelloData)
        })());
    }

    public deleteComment(commentId: number, trelloData: DataType): DataType {
        StorageService.setTrelloData(((): DataType => {
            trelloData.comments = trelloData.comments.filter((comment) => comment.id !== commentId);
            return this.setTrelloStorage(trelloData)
        })());
        return trelloData
    }

    public editComment(comment: CommentType, trelloData: DataType) {
        this.deleteComment(comment.id, trelloData)
        this.saveNewComment(comment.cardId, comment, trelloData)
    }
}
