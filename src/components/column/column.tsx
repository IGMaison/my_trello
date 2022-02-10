import React, {Fragment, SyntheticEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import CardSticker from "../card_sticker";
import {Button} from "../UI";
import {buttonStyleEnum} from "../UI";
import {Context} from "../../context";
import {storageService} from "../services";

type PropsType = {
    id: string;
    columnContent: { title: string; content: Array<object> };
};

const Column = ({id, columnContent}: PropsType) => {
    const context: any = useContext(Context);
    const [inputValue, setInputValue] = useState(columnContent.title);
    const [visibility, setVisibility] = useState(false);

    const newCardInfo = {
        id: Date.now(),
        cardArrIdx: Infinity,
        columnId: id,
        columnName: columnContent.title,
        name: "",
        text: "",
        user: context.userName,
        newCard: true,
    };

    function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(ev.target.value);
    }

    function exitInput(ev: KeyboardEvent) {
        if (ev.key === "Escape" || ev.key === undefined) {
            setVisibility(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", exitInput);
        return () => {
            document.removeEventListener("keydown", exitInput);
        };
    }, []);

    function saveColumnTitle(ev: SyntheticEvent) {
        ev.preventDefault();
        if (!inputValue.trim()
        ) {
            return;
        }
        setVisibility(false);
        context.setTrelloData(() => {
            context.trelloData.columns[id].title = inputValue;
            return storageService.setTrelloStorage(context.trelloData)
        })
    };


    function addCard() {
        context.setCardStatus(true);
        context.setCardContent(newCardInfo);
    }

    function enterInput() {
        setVisibility(true);
    }

    return (
        <ColumnWrapper>
            <Content>

                {visibility &&
                <Fragment>
                    <SaveButton
                        value={'Сохранить'}
                        onClick={saveColumnTitle}
                        type="submit"/>
                    <Input
                        onChange={onChangeInput}
                        value={inputValue}
                        name="columnName"
                        placeholder="ЗАГОЛОВОК КОЛОНКИ"

                    />
                </Fragment>}

                <ColumnTitle onClick={enterInput}>
                    {columnContent.title}
                </ColumnTitle>

                {columnContent.content.map((card: any, idx) =>
                    card ? (

                        <CardSticker
                            key={card.id}
                            cardInfo={{
                                columnId: id,
                                columnName: columnContent.title,
                                cardArrIdx: idx,
                                ...card,
                            }}
                        />
                    ) : (
                        <></>
                    )
                )}

                <Button onClick={addCard} buttonStyle={buttonStyleEnum.STRING_GREY}>
                    + Добавить карточку

                </Button>
            </Content>
        </ColumnWrapper>
    );
};

export default Column;

const ColumnWrapper = styled.div`
  background-color: #456;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  white-space: normal;
  width: 100%;
  max-width: 300px;
  min-width: 300px;
  margin: 8px;
`;

const ColumnTitle = styled.div`
  color: black;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  padding: 10 px 8 px;
  min-height: 20px;
  text-align: left;
  text-transform: uppercase;
    cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: skyblue;
  };
`;

const Content = styled.div`
  background-color: #ebecf0;
  padding: 8px;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  white-space: normal;
  width: 100%;
  max-width: 300px;
`;

const Input = styled.input`
  ::placeholder {
    color: #f004;
    text-transform: uppercase;
  }
  position: absolute;
  top: 12px;
  left: 17px;
  border-radius: 3px;
  autofocus: true;
  placeholder: "placeholder";
  background-color: #fff;
  overflow-wrap: break-word;
  font-size: 20px;
  line-height: 1em;
  width: 95%;
  text-transform: uppercase;
  z-index: 9;
`;

const SaveButton = styled.input`
  position: absolute;
  top: 43px;
  left: 17px;
  z-index: 10;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  border-radius: 3px;
  background-color: #e91;
  color: #fff;
  border: 0px solid;
  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: skyblue;
  }
\`;
`
