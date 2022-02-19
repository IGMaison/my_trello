import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Card from "../card";
import {Button} from "../UI";
import {buttonStyleEnum} from "../UI";
import {Context} from "../../context";
import {storageService} from "../../App";
import {settings} from "../../settings";
import {CardType, ColumnsType} from "../../types";
import {CardModalType, ContxtType} from "../../types/types";
import CardModal from "../card_modal";

type PropsType = {
    columnId: number;
    column: ColumnsType;
};

const Column: React.FC<PropsType> = ({columnId, column}) => {
    const context: ContxtType = useContext(Context);

    const [columnTitleInputValue, setColumnTitleInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
        setColumnTitleInputValue(ev.target.value);
    }

    function onEscKeyDown(ev: KeyboardEvent) {
        if (ev.key === "Escape") {
            (() => setIsVisible(false))()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onEscKeyDown);
        return () => {
            document.removeEventListener("keydown", onEscKeyDown);
        };
    }, []);

    useEffect(() => {
        setColumnTitleInputValue(column.title);
    }, [isVisible]);

    function onSaveColumnTitleClick(ev: SyntheticEvent) {
        ev.preventDefault();
        if (!columnTitleInputValue.trim()
        ) {
            return;
        }
        setIsVisible(false);
        storageService.editColumnTitle(columnId, columnTitleInputValue, context.trelloData)
    }


    function onAddCardClick() {
        let newCard = {
            comments: [],
            id: Date.now(),
            name: "",
            text: "",
            user: context.userName,
        }
        context.setCardModal({card:newCard, columnId: columnId, isNew: true} as CardModalType);
        context.setIsModalVisible(true);
        context.setModalContent(()=><CardModal/>)
    }

    function onColumnTitleClick() {
        setIsVisible(true);
    }


    return (
        <ColumnWrapper>
            <Content>

                {isVisible &&
                <ColumnTitleInputBackground>
                    <form autoComplete={"off"}>
                        <Input
                            onChange={onChangeInput}
                            value={columnTitleInputValue}
                            name="columnName"
                            placeholder={settings.column.namePlaceholder}
                        />

                        <SaveButton
                            value={settings.button.save}
                            onClick={onSaveColumnTitleClick}
                            type="submit"/>
                    </form>
                </ColumnTitleInputBackground>
                }

                <ColumnTitle onClick={onColumnTitleClick}>
                    {column.title}
                </ColumnTitle>

                {column.cards.map((card: CardType) =>{  return (
                        <Card
                            key={card.id}
                            card={card}
                            columnId={columnId}
                        />
                    )}
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
  padding: 10px 8px;
  min-height: 20px;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }

  &:active {
    background-color: skyblue;
  }
;
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
  padding: 12px;
  position: absolute;
  top: -2px;
  left: -10px;
  z-index: 9;
  box-shadow: 0 0 25px 34px #0000008c;
`

const SaveButton = styled.input`
  position: absolute;
  top: 53px;
  left: 31px;
  z-index: 10;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  border-radius: 3px;
  background-color: #e91;
  color: #fff;
  border: 0 solid;

  &:hover {
    background-color: lightblue;
  }

  &:active {
    background-color: skyblue;
  }

\` ;
`
