import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {Button, buttonStyleEnum} from "../UI";
import Comments from "../comments";
import {Context} from "../../context";
import {storageService} from "../../App";
import {settings} from "../../settings";
import {buttonStyle} from "../UI/button";
import {ContxtType} from "../../types/types";


const CardModal = () => {

        const context: ContxtType = useContext(Context);

        const [isSaveButtonVisible, setIsSaveButtonVisible] = useState<boolean>(false);
        const [textValue, setTextValue] = useState<string>(context.cardModal.card.text)
        const [nameValue, setNameValue] = useState<string>(context.cardModal.card.name)


        useEffect(() => {
            document.addEventListener("keydown", onEscKeyDown)
            return () => {
                document.removeEventListener("keydown", onEscKeyDown);

            }
        });

        if (!context.cardModal.card.id) {
            return <></>
        }
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
            context.setIsModalVisible(false);
        }

        const onCardSubmit = (isDelete = false) => (ev: SyntheticEvent) => {
            ev.preventDefault();
            if (!nameValue) {
                return;
            }

            if (isDelete) {

                storageService.deleteCard(context.cardModal.columnId, context.cardModal.card.id, context.trelloData);

            } else {
                const cardEdited = {
                    id: context.cardModal.card.id,
                    name: nameValue,
                    user: context.cardModal.card.user,
                    text: textValue
                    ,
                    comments: !context.cardModal.card.comments.length ? [] : context.cardModal.card.comments
                }

                storageService.SaveCard(context.cardModal.columnId, cardEdited, context.trelloData)
            }
            onCloseCardClick();
        }

        function onEscKeyDown(ev: KeyboardEvent) {
            if (context.isModalVisible && ev.key === "Escape") {
                setIsSaveButtonVisible(false);
                context.setIsModalVisible(false);
            }
        }


        return (
            <CardBackground>
                <PopupCard>

                    <ColumnTop>{context.trelloData.columns.filter((column) => column.id === context.cardModal.columnId)[0].title || ""}</ColumnTop>
                    <CloseButton
                        onClick={onCloseCardClick}
                        buttonStyle={buttonStyleEnum.ORANGE}
                    >
                        {settings.button.x}
                    </CloseButton>

                    <form autoComplete={"off"} onSubmit={onCardSubmit()}>
                        <CardName
                            onChange={onCardNameChange}
                            autoComplete={"off"}
                            name="cardName"
                            value={nameValue}
                            placeholder={settings.cardModal.namePlaceholder}
                        />

                        {isSaveButtonVisible && <Submit
                            buttonStyle={buttonStyleEnum.ORANGE}
                            type="submit"
                            name="submitCardName"
                            value={settings.button.saveCard}
                        >

                        </Submit>}


                        <Author>{settings.cardModal.creator} {context.cardModal.card.user}</Author>


                        <ContHeader>{settings.cardModal.text}</ContHeader>


                        <CardText
                            onChange={onCardTextChange}
                            name="cardName"
                            value={textValue}
                            placeholder={settings.cardModal.textPlaceholder}
                        />
                    </form>

                    {!context.cardModal.isNew && (
                        <Comments
                            columnId={context.cardModal.columnId}
                            cardId={context.cardModal.card.id}
                            comments={context.trelloData.columns.filter((column) => column.id === context.cardModal.columnId)[0].cards.filter((card) => card.id === context.cardModal.card.id)[0].comments}
                        />
                    )}

                    {!!context.cardModal.card.id && <ButtonDel
                        onClick={onCardSubmit(true)}
                        buttonStyle={buttonStyleEnum.STRING_GREY}
                    >
                        {settings.button.deleteCard}
                    </ButtonDel>}
                </PopupCard>
            </CardBackground>
        );
    }
;

export default CardModal;

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
  max-height: 85vh;
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

  &:hover {
    background-color: #dadbe0;
  }

  &:focus {
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

  &:hover {
    background-color: #dadbe0;
  }

  &:focus {
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