import React from "react";
import styled from "styled-components";
import {ButtonStringOrange} from "../IU";
import {ButtonString} from "../IU";
import CardContent from "./card_content";
import CardName from "./card_name";

const Card = () => {
    return (
        <Back>
            <PopupCard>
                <ButtonClose>X</ButtonClose>
                <CardName contentEditable={true} weight={700} size="24px"/>
                <ButtonStringOrange>Сохранить</ButtonStringOrange>
                <Author>Создал: Автор А.А.</Author>
                <CardContent/>
                <ButtonString style={{float: "right"}}>Удалить карточку</ButtonString>
            </PopupCard>
        </Back>
    );
};

export default Card;

const Back = styled.div`
  position: absolute;
  min-width: 100%;
  min-height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #0000008c;
`;

const PopupCard = styled.div`
  background-color: #ebecf0;
  padding: 1.5em;
  border-radius: 3px;
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

const Author = styled.div`
  font-weight: 300;
`;

const ButtonClose = styled(ButtonStringOrange)`
  float: right;
`;