import React from "react";

export const settings = {
    card: {
        infoIcon: <>&#9776;&nbsp;&nbsp;&nbsp;</>,
        cardInfoIconTitle: "Наличие описания",
        commentsNumberIcon: <>&#9993; </>,
        commentsNumberIconTitle: "Количество комментариев",
    },


    cardModal: {
        textPlaceholder: "Подробного описания нет, но прямо здесь его можно написать.",
        namePlaceholder: "Новый заголовок",
        comments: "Комментарии",
        text: "Описание",
        creator: "Создал:",
        emptyCard: {
            id: 0,
            name: "",
            text: "",
            user: "",
            columnId: 0,
        },
    },
    comments:{
        name: "Комментарии",
        author: "Автор коммента:",
        newCommentPlaceholder: "Коммент писать здесь",
        welcomeText: "Напишите свой комментарий."
    },
    button: {
        saveCard: "Сохранить крточку",
        addCard: "+ Добавить карточку",
        deleteCard: "Удалить карточку",
        save: "Сохранить",
        change: "Изменить",
        next: "Далее >",
        x: "X"
    },
    column: {
        namePlaceholder: "ЗАГОЛОВОК КОЛОНКИ"
    },
    enter:{
        placeholder: "Введите ваше имя здесь.",
    },
    baseName: "t",
    emptyData:  {
        columns: [
            {
                id: 1,
                title: "TODO",
            },
            {
                id: 2,
                title: "IN PROGRESS",
            },
            {
                id: 3,
                title: "TESTING",
            },
            {
                id: 4,
                title: "DONE",
            }
        ],
        cards: [],
        comments: [],

    }

}
