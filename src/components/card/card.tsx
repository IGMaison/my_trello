import React from "react";
import styled from "styled-components";
import {Button} from "../UI";
import Comments from "../comments";

const Card = () => {
    return (
        <Back>
            <PopupCard>
                <ButtonClose>X</ButtonClose>
                <CardName contentEditable={true}>Заголовок карточки</CardName>
                <ButtonOrange>Сохранить</ButtonOrange>
                <Author>Создал: Автор А.А.</Author>
                <Content>
                    <ContHeader>Описание</ContHeader>
                    <ButtonEdit>Изменить</ButtonEdit>
                    <CardText contentEditable="true">Описание подробно</CardText>
                    <Comments />
                </Content>
                <Button style={{float: "right"}}>Удалить карточку</Button>
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

const CardName = styled.div`
  font-weight: 700;
  margin: 0;
  padding: 1px;
  font-size: 24px;
  line-height: 1.3em;
  position: relative;
  display: flow-root;
`;

const Author = styled.div`
  font-weight: 300;
`;

const ButtonOrange = styled(Button)`
  border-radius: 3px;
  background-color: #e91;
  color: #fff;
  border: 0px solid;
`

const ButtonClose = styled(Button)`
  border-radius: 3px;
  background-color: #e91;
  color: #fff;
  border: 0px solid;
  float: right;
`;

const ButtonEdit = styled(Button)`
  background-color: #ddd;
`;
const ContHeader = styled.h2`
  display: inline-block;
  margin-block: 0;
  margin: 1em 1em 0 0;
`;

const CardText = styled.div`
  margin: 1em;
  padding: 2px;
  border: #ccc 1px;
  border-style: none none solid solid;
`;

const Content = styled.div`
  margin: 0;
  padding: 0;
`;

