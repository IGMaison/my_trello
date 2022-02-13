import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import CardSticker from "../card_sticker";
import {Button} from "../UI";
import {buttonStyleEnum} from "../UI";
import {Context} from "../../context";
import {DataType, storageService} from "../services";
import {ContxtType} from "../../App";
import {CardContent} from "../services/storage_service";
import {settings} from "../../settings";

type PropsType = {
    id: string;
    columnContent: { title: string; content: Array<CardContent> };
};

const Column = ({id, columnContent}: PropsType) => {
    const context: ContxtType = useContext(Context);
    //TODO: inputValue - что это за инпут, что в нем храниться?V
    const [ColumnTitleInputValue, setColumnTitleInputValue] = useState("");
    //TODO: boolean - is V
    const [isVisible, setIsVisible] = useState(false);

    const newCardInfo = {
        comments: [],
        id: Date.now(),
        cardArrIdx: Infinity,
        columnId: id,
        columnName: columnContent.title,
        name: "",
        text: "",
        user: context.userName,
        isNewCard: true,
    };

    function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
        setColumnTitleInputValue(ev.target.value);
    }

    function onEscKeyDown(ev: KeyboardEvent) {
        if (ev.key === "Escape") {
            (()=>setIsVisible(false))()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onEscKeyDown);
        return () => {
            document.removeEventListener("keydown", onEscKeyDown);
        };
    }, [isVisible]);

    useEffect(() => {
        setColumnTitleInputValue(columnContent.title);
    }, [isVisible]);

    function onSaveColumnTitleClick(ev: SyntheticEvent) {
        ev.preventDefault();
        if (!ColumnTitleInputValue.trim()
        ) {
            return;
        }
        setIsVisible(false);
        context.setTrelloData(((): DataType => {
            context.trelloData.columns[id].title = ColumnTitleInputValue;
            return storageService.setTrelloStorage(context.trelloData)
        })())
    }


    function onAddCardClick() {
        context.setIsCardVisible(true);
        context.setCardContent(newCardInfo);
    }

    function onColumnTitleClick() {
        setIsVisible(true);
    }

    return (
        <ColumnWrapper>
            <Content>

                {isVisible &&
                <ColumnTitleInputBackground>
                    <Input
                        onChange={onChangeInput}
                        value={ColumnTitleInputValue}
                        name="columnName"
                        placeholder={settings.column.namePlaceholder}
                    />

                    <SaveButton
                        value={settings.button.save}
                        onClick={onSaveColumnTitleClick}
                        type="submit"/>
                </ColumnTitleInputBackground>
                }

                <ColumnTitle onClick={onColumnTitleClick}>
                    {columnContent.title}
                </ColumnTitle>

                {/*TODO: что здесь делает any?V*/}
                {columnContent.content.map((CardContent: CardContent, idx) =>
                    CardContent ? (
                        <CardSticker
                            isNewCard={false}
                            columnId={id}
                            key={CardContent.id}
                            cardArrIdx={idx}
                            {...CardContent}
                        />
                    ) : (
                        <></>
                    )
                )}

                <Button onClick={onAddCardClick} buttonStyle={buttonStyleEnum.STRING_GREY}>
                    {settings.button.addCard}

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
  position: relative;
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

const ColumnTitleInputBackground = styled.div`
    width: 331px;   
    height: 66px;
    background-color: #0000008c;
    border-radius: 116px;
    padding: 12p;
    position: absolute;
    top: -2px;   
    left: -10px;
    z-index: 9;
    box-shadow: 0 0 25px 34px #0000008c;
`

const SaveButton = styled.input`
  position: absolute;
  top: 43px;
  left: 19px;
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
