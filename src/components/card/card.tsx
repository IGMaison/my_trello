import React, {Fragment, SyntheticEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "../UI";
import {buttonStyleEnum} from "../UI";
import Comments from "../comments";
import {Context} from "../../context";
import {storageService} from "../services";
import {CardContent} from "../services/storage_service";
import {ContxtType} from "../../App";

/**
 * Замечание в целом по компоненту, ты хочешь менять имя карточки, и все делаешь через ref
 * Это нужно делать через state и в state хранить название и все операции проводить над state,
 * если все это делать через ref, то начинает появляться куча хлама в компонентах и читаемость резко падает
 */
const Card = (props: CardContent & {newCard:boolean; columnId:string; cardArrIdx: number}) => {
    const context: ContxtType = useContext(Context);
    /**
     * Убираем лишнее из компонентов, делаем их чистенькими
     */
    const emptyText =
        "Подробного описания нет, но прямо здесь его можно написать.";
    const emptyName = "Новый заголовок";
    let cardTextRef = React.createRef<HTMLDivElement>();
    let cardNameRef = React.createRef<HTMLDivElement>();
    /**
     * если boolean, то isButtonVisibility
     */
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(false);

    const clearCardText = () => {
        if (cardTextRef.current) {
            /**
             * Стили в стейте
             */
            cardTextRef.current.style.backgroundColor = "white";
            setButtonVisibility(true);
            if (!(cardTextRef.current.textContent && cardTextRef.current.textContent.trim() != emptyText)) {
                cardTextRef.current.textContent = "";
            }
        }
    };

    const restoreDefaultCardText = () => {
        if (cardTextRef.current) {
            if (!(cardTextRef.current.textContent && cardTextRef.current.textContent.trim())) {
                cardTextRef.current.textContent = emptyText;
            }
            cardTextRef.current.style.backgroundColor = "#ebecf0";
        }
    };

    const CloseCard = () => {
        setButtonVisibility(false);
        context.setCardStatus(false);
    };

    const restoreDefaultCardName = () => {
        if (cardNameRef.current) {
            if (!(cardNameRef.current.textContent && cardNameRef.current.textContent.trim())) {
                cardNameRef.current.textContent = emptyName;
                setButtonVisibility(false);
            }
            cardNameRef.current.style.backgroundColor = "#ebecf0";
        }
    };
    const clearCardName = () => {
        if (cardNameRef.current) {
            cardNameRef.current.style.backgroundColor = "white";
            setButtonVisibility(true);
            if (!(cardNameRef.current.textContent && cardNameRef.current.textContent.trim() != emptyName)) {
                cardNameRef.current.textContent = "";
            }
        }
    };

    function saveCard(ev: SyntheticEvent, isDelete = false) {
        console.log(context.trelloData.columns[props.columnId].content)
        if (!(cardNameRef.current && cardNameRef.current.textContent) ||
            (cardNameRef.current.textContent.trim() == emptyName ||
                !cardNameRef.current.textContent.trim())
        ) {
            return;
        }

        if (isDelete) {
            context.trelloData.columns[props.columnId].content.splice(props.cardArrIdx, 1)
        } else {
            const cardContent = {
                id: props.id,
                name: cardNameRef.current && cardNameRef.current.textContent,
                user: props.user,
                text: String(cardTextRef.current && cardTextRef.current.textContent &&
                    cardTextRef.current.textContent.trim() == emptyText
                    ? ""
                    : cardTextRef.current && cardTextRef.current.textContent
                ),
                comments: props.newCard ? [] : context.trelloData.columns[props.columnId].content[props.cardArrIdx].comments
            }

            context.trelloData.columns[props.columnId].content.splice(
                props.cardArrIdx,
                props.newCard ? 0 : 1,
                cardContent as CardContent
            );
        }


        context.setTrelloData(storageService.setTrelloStorage(context.trelloData));
        CloseCard();
    }

    function escKeyDown(ev: KeyboardEvent) {
        if (ev.key === "Escape") {
            setButtonVisibility(false);
            context.setCardStatus(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escKeyDown);
        return () => {
            document.removeEventListener("keydown", escKeyDown);
        };
    }, [context.cardStatus]);

    return (
        <Fragment>
            {context.cardStatus && (
                <CardBackground>
                    <PopupCard>

                        <ColumnTop>{context.trelloData.columns[props.columnId].title || ""}</ColumnTop>
                        <CloseButton
                            onClick={CloseCard}
                            buttonStyle={buttonStyleEnum.ORANGE}
                        >
                            X
                        </CloseButton>

                        <CardName
                            ref={cardNameRef}
                            onBlur={restoreDefaultCardName}
                            onFocus={clearCardName}
                            contentEditable={true}
                        >
                            {props.name ? props.name : emptyName}
                        </CardName>

                        {buttonVisibility && <Button
                            onClick={(ev) => saveCard(ev)}
                            buttonStyle={buttonStyleEnum.ORANGE}
                        >
                            Сохранить карточку
                        </Button>}

                        <Author>Создал: {props.user}</Author>

                        <Content>

                            <ContHeader>Описание</ContHeader>

                            <CardText
                                ref={cardTextRef}
                                onBlur={restoreDefaultCardText}
                                onFocus={clearCardText}
                                contentEditable="true"
                            >
                                {props.text ? props.text : emptyText}
                            </CardText>

                            {props.newCard || (
                                <Comments
                                    columnId={props.columnId}
                                    cardArrIdx={props.cardArrIdx}
                                    comments={props.comments}
                                />
                            )}
                        </Content>
                        {!props.newCard && <Button
                            onClick={(ev) => saveCard(ev, true)}
                            buttonStyle={buttonStyleEnum.STRING_GREY}
                            style={{float: "right"}}
                        >
                            Удалить карточку
                        </Button>}
                    </PopupCard>
                </CardBackground>
            )}
        </Fragment>
    );
};

export default Card;

const CloseButton = styled(Button)`
  float: right;
  background-color: #b7a186;
`;

const CardBackground = styled.div`
  position: absolute;
  min-width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #0000008c;
`;

const ColumnTop = styled.div`
  background-color: #b7a186;
  color: white;
  padding: 10px;
  border-radius: 9px 43px 0 0;
  box-sizing: border-box;
  width: 303px;
  position: inherit;
  left: 0;
  top: -40px;
  height: 40px;
`;

const PopupCard = styled.div`
  background-color: #ebecf0;
  padding: 1.5em;
  border-radius: 0 3px 3px 3px;
  box-sizing: border-box;
  width: 768px;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  height: fit-content;
`;

const CardName = styled.div`
  cursor: pointer;
  font-weight: 700;
  margin: 0 0 0.2rem;
  padding: 1px;
  font-size: 24px;
  line-height: 1.3em;
  position: relative;
  display: flow-root;
  &:hover {
    background-color: #dadbe0;
  }
`;

const Author = styled.div`
  font-weight: 300;
`;

const ContHeader = styled.h2`
  display: inline-block;
  margin-block: 0;
  margin: 1em 1em 0 0;
`;

const CardText = styled.div`
  cursor: pointer;
  margin: 1em;
  padding: 2px;
  border: #ccc 1px;
  border-style: none none solid solid;
  &:hover {
    background-color: #dadbe0;
  }
`;

const Content = styled.div`
  margin: 0;
  padding: 0;
`;
