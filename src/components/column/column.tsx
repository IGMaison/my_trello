import React, {useContext} from "react";
import styled from "styled-components";
import CardSticker from "../card_sticker";
import {Button} from "../UI";
import {buttonStyleEnum} from "../UI";
import {Context} from "../../context";

type PropsType = { id: string, columnContent: { title: string, content: Array<object> } }

const Column = ({id, columnContent}: PropsType) => {

    const context: any = useContext(Context);
    const newCardInfo = {
        id: Date.now(),
        columnId: id,
        name: "",
        text: "",
        user: context.userName,
        hideComments: true,
    }



    function addCard() {
        context.setCardStatus(true);
        context.setCardContent(newCardInfo);
    }

    return (
        <ColumnWrapper>
            <Content>
                <ColumnTitle>{columnContent.title}</ColumnTitle>
                {columnContent.content.map((card: any) => <CardSticker key={card.id} cardInfo={card}/>)}

                <Button onClick={addCard} buttonStyle={buttonStyleEnum.STRING_GREY}>+ Добавить карточку</Button>
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
  padding: 0.2em 1em;
  font-size: 15px;
  font-weight: 600;
  padding: 10 px 8 px;
  min-height: 20px;
  text-align: left;
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
