import {CardType, CommentType, DataType} from "../../types";
import {settings} from "../../settings";
import {Context} from "../../context";
import {useContext} from "react";

class StorageService {
    private baseName = settings.baseName;
    private trelloStorage = localStorage;
    private context = useContext(Context)

    constructor() {
    }

    public getTrelloStorage(): DataType {
        if (this.baseName in this.trelloStorage) {
            return JSON.parse(this.trelloStorage[this.baseName]);
        }
        this.trelloStorage[this.baseName] = JSON.stringify(settings.emptyData);
        return settings.emptyData;
    }

    public setTrelloStorage(base: DataType): DataType {

        this.trelloStorage[this.baseName] = JSON.stringify(base)
        return base;
    }

    public editColumnTitle(columnId: number, title: string): void {
        this.context.setTrelloData(((): DataType => {
            this.context.trelloData.columns[columnId].title = title;
            return storageService.setTrelloStorage(this.context.trelloData)
        })())
    }

    public deleteCard(columnId: number, cardId: number): DataType {
        this.context.setTrelloData(((): DataType => {
            this.context.trelloData.columns[columnId].cards = this.context.trelloData.columns[columnId].cards.filter((card) => card.id !== cardId)
            return storageService.setTrelloStorage(this.context.trelloData)
        })())
        return this.context.trelloData
    }

    public SaveCard(columnId: number, editedCard: CardType): void {
        this.deleteCard(columnId, editedCard.id).columns[columnId].cards.push(editedCard);
        this.context.trelloData.columns[columnId].cards = this.context.trelloData.columns[columnId].cards.sort((a, b) => a.id - b.id);
        storageService.setTrelloStorage(this.context.trelloData)
    }

    public saveNewComment(columnId: number, cardId: number, comment: CommentType, emptyComments: boolean): void {
        if (emptyComments) {
            this.context.trelloData.columns[columnId].cards.filter((card: CardType) => card.id === cardId)[0].comments.push(
                comment
            );
        } else {
            this.context.trelloData.columns[columnId].cards[cardId].comments = [
                comment,
            ];
        }
        let cardArrIdx = this.context.trelloData.columns[columnId].cards.findIndex((card: CardType) => card.id === cardId)
        this.context.trelloData.columns[columnId].cards[cardArrIdx].comments = this.context.trelloData.columns[columnId].cards[cardArrIdx].comments.sort((a, b) => b.id - a.id);
        this.context.setTrelloData(((): DataType => storageService.setTrelloStorage(this.context.trelloData))());
    }


}

export const storageService = new StorageService();