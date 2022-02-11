export type CommentsType = { id: number; text: string; user: string };

export type CardContent = {
    comments: CommentsType[],
    id: number,
    name: string,
    text: string,
    user: string,
}

export type DataType = {
    columns: { [index: string]: { title: string; content: Array<CardContent> } };
}



class StorageService {

    public emptyData: DataType = {
        columns: {
            1: {title: "TODO", content: []},
            2: {title: "IN PROGRESS", content: []},
            3: {title: "TESTING", content: []},
            4: {title: "DONE", content: []},
        },
    };
    private baseName = 't';
    private trelloStorage = localStorage;

    constructor() {
    }

    get getTrelloStorage (): DataType {
        if (this.baseName in this.trelloStorage) {
            return JSON.parse(this.trelloStorage[this.baseName]);
        }
        this.trelloStorage[this.baseName] = JSON.stringify(this.emptyData);
        return this.emptyData;
    }

    setTrelloStorage (base: DataType) : DataType{

        this.trelloStorage[this.baseName] = JSON.stringify(base)
        return base;
    }
}

export const storageService = new StorageService();