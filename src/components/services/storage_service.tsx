export interface dataType {
    columns: { [index: string]: { title: string; content: Array<object> } };
}

export let emptyData: dataType = {
    columns: {
        1: {title: "TODO", content: []},
        2: {title: "IN PROGRESS", content: []},
        3: {title: "TESTING", content: []},
        4: {title: "DONE", content: []},
    },
};

export function storageService(data?: dataType): dataType {
    let localStorage = window.localStorage;
    const baseName = 't';
    if (data) {
        localStorage[baseName] = JSON.stringify(data);
        return data;
    } else {
        if (baseName in localStorage) {
            return JSON.parse(localStorage[baseName]);
        }
    }
    localStorage[baseName] = JSON.stringify(emptyData);
    return emptyData;
}
