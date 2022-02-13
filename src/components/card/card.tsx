import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {Button, buttonStyleEnum} from "../UI";
import Comments from "../comments";
import {Context} from "../../context";
import {storageService} from "../services";
import {CardContent} from "../services/storage_service";
import {ContxtType} from "../../App";
import {settings} from "../../settings";
import {buttonStyle} from "../UI/button";

/**
 * Замечание в целом по компоненту, ты хочешь менять имя карточки, и все делаешь через ref
 * Это нужно делать через state и в state хранить название и все операции проводить над state,
 * если все это делать через ref, то начинает появляться куча хлама в компонентах и читаемость резко падает


 - так лучше?  */
const Card = (props: CardContent & { isNewCard: boolean; columnId: string; cardArrIdx: number }) => {
        const context: ContxtType = useContext(Context);
        /**
         * Убираем лишнее из компонентов, делаем их чистенькими V
         */
        const emptyText = settings.card.textPlaceholder;
        const emptyName = settings.card.namePlaceholder;
        /**
         * если boolean, то isButtonVisibility V
         */
        const [isSaveButtonVisible, setIsSaveButtonVisible] = useState<boolean>(false);
        const [textValue, setTextValue] = useState<string>(props.text)
        const [nameValue, setNameValue] = useState<string>(props.name)


        const onCardNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
            setNameValue(ev.target.value)
            setIsSaveButtonVisible(!!ev.target.value)
        }

        const onCardTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextValue(ev.target.value)
            nameValue && setIsSaveButtonVisible(true);
        }

        const onCloseCardClick = () => {
            setIsSaveButtonVisible(false);
            context.setIsCardVisible(false);
        }

        function onCardSubmit(ev: SyntheticEvent, isDelete = false) {
            ev.preventDefault();
            if (!nameValue) {
                return;
            }

            if (isDelete) {
                context.trelloData.columns[props.columnId].content.splice(props.cardArrIdx, 1)
            } else {
                const cardContent = {
                    id: props.id,
                    name: nameValue,
                    user: props.user,
                    text: textValue
                    ,
                    comments: props.isNewCard ? [] : context.trelloData.columns[props.columnId].content[props.cardArrIdx].comments
                }

                context.trelloData.columns[props.columnId].content.splice(
                    props.cardArrIdx,
                    props.isNewCard ? 0 : 1,
                    cardContent as CardContent
                );
            }


            context.setTrelloData(storageService.setTrelloStorage(context.trelloData));
            onCloseCardClick();
        }

        function onEscKeyDown(ev: KeyboardEvent) {
            if (context.isCardVisible && ev.key === "Escape") {
                setIsSaveButtonVisible(false);
                context.setIsCardVisible(false);
            }
        }

        useEffect(() => {
            document.addEventListener("keydown", onEscKeyDown)
            return () => {
                document.removeEventListener("keydown", onEscKeyDown);

            }
        });

        return (
            <CardBackground>
                <PopupCard>

                    <ColumnTop>{context.trelloData.columns[props.columnId].title || ""}</ColumnTop>
                    <CloseButton
                        onClick={onCloseCardClick}
                        buttonStyle={buttonStyleEnum.ORANGE}
                    >
                        {settings.button.x}
                    </CloseButton>

                    <form autoComplete={"off"} onSubmit={onCardSubmit}>
                        <CardName
                            onChange={onCardNameChange}
                            autoComplete={"off"}
                            name="cardName"
                            value={nameValue}
                            placeholder={emptyName}
                        />

                        {isSaveButtonVisible && <Submit
                            buttonStyle={buttonStyleEnum.ORANGE}
                            type="submit"
                            name="submitCardName"
                            value={settings.button.saveCard}
                        >

                        </Submit>}


                        <Author>{settings.card.creator} {props.user}</Author>


                        <ContHeader>{settings.card.text}</ContHeader>


                        <CardText
                            onChange={onCardTextChange}
                            name="cardName"
                            value={textValue}
                            placeholder={emptyText}
                        />
                    </form>

                    {props.isNewCard || (
                        <Comments
                            columnId={props.columnId}
                            cardArrIdx={props.cardArrIdx}
                            comments={props.comments}
                        />
                    )}

                    {!props.isNewCard && <ButtonDel
                        onClick={(ev) => onCardSubmit(ev, true)}
                        buttonStyle={buttonStyleEnum.STRING_GREY}
                    >
                        {settings.button.deleteCard}
                    </ButtonDel>}
                </PopupCard>
            </CardBackground>
        );
    }
;

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

const CardName = styled.input`
background-color: #ebecf0;
border: none;
cursor: pointer;
font-weight: 700;
margin: 0 0 0.2rem;
padding: 1px;
font-size: 24px;
line-height: 1.3em;
position: relative;
display: flow-root;
width: 95%;
&: hover {
    background-color: #dadbe0;
}
&: focus {
    background-color: white
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

const CardText = styled.textarea`
background-color: #ebecf0;
cursor: pointer;
margin: 1em;
padding: 2px;
resize: none;
overflow: hidden;
min-height: 50px;   
width: 96%;
font-size: 14px;
border: #ccc 1px;
border-style: none none solid solid;
&: hover {
    background-color: #dadbe0;
}
&: focus {
    background-color: white
}
`;

const Submit = styled.input<{ buttonStyle: buttonStyleEnum }>`
     ${buttonStyle[buttonStyleEnum.BASE]}
     ${buttonStyle[buttonStyleEnum.ORANGE]}
`

const ButtonDel = styled(Button)`
    float: right;
`