//TODO: интерфейсы с большой буквы
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

//TODO: лучше создать класс с методами get и set
export function storageService(data?: dataType): dataType {
    //TODO: все поля window находятся в глоьбальном скоупе видимости, поэтому чтобы к ним обращаться можно не писать window.
    // в данном случае просто localStorage
    let localStorage = window.localStorage;
    const baseName = 't';
    if (data) {
        //TODO: у localStorage есть методы get и set, лучше не обращаться через localStorage[key]
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
