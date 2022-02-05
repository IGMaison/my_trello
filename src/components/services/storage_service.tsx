export interface dataType {
  columns: { [index: string]: { title: string; content: {}[] } };
}

export let emptyData: dataType = {
  columns: {
    1: { title: "TODO", content: [] },
    2: { title: "IN PROGRESS", content: [] },
    3: { title: "TESTING", content: [] },
    4: { title: "DONE", content: [] },
  },
};



export function storageService(name: string, data?: dataType): dataType {
  let localStorage = window.localStorage;
  if (data) {
    localStorage[name] = JSON.stringify(data);
    return data;
  } else {
    if (name in localStorage) {
      return { user: name, ...JSON.parse(localStorage[name]) };
    }
  }
  localStorage[name] = JSON.stringify(emptyData);
  return emptyData;
}
