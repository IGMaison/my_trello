import React, { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../UI";
import { buttonStyleEnum } from "../UI";
import Comments from "../comments";
import { Context } from "../../context";
import { storageService } from "../services";

type CommentsType = { id: number; text: string; user: string };

type PropsType = {
  comments: Array<CommentsType>;
  id: number;
  columnId: string;
  columnName: string;
  name: string;
  text: string;
  user: string;
  cardArrIdx: number;
  newCard?: boolean;
};

const Card = (props: PropsType) => {
  const context: any = useContext(Context);
  const emptyText =
    "Подробного описания нет, но прямо здесь его можно написать.";
  const emptyName = "Новый заголовок";
  let newText = React.createRef<any>();
  let newName = React.createRef<any>();
  const [buttonVisibility, setButtonVisibility] = useState({ display: "none" });

  const clearRef = () => {
    newText.current.style.backgroundColor = "white";
    setButtonVisibility({ display: "block" });
    if (newText.current.textContent.trim() == emptyText) {
      newText.current.textContent = "";
    }
  };

  const restoreRef = () => {
    if (!newText.current.textContent.trim()) {
      newText.current.textContent = emptyText;
    }
    newText.current.style.backgroundColor = "#ebecf0";
  };

  const clickClose = () => {
    setButtonVisibility({ display: "none" });
    context.setCardStatus(false);
  };

  const restoreRefName = () => {
    if (!newName.current.textContent.trim()) {
      newName.current.textContent = emptyName;
      setButtonVisibility({ display: "none" });
    }
    newName.current.style.backgroundColor = "#ebecf0";
  };
  const clearRefName = () => {
    newName.current.style.backgroundColor = "white";
    setButtonVisibility({ display: "block" });
    if (newName.current.textContent.trim() == emptyName) {
      newName.current.textContent = "";
    }
  };

  function saveCard(ev: any, isDelete = false) {
    if (
      newName.current.textContent.trim() == emptyName ||
      !newName.current.textContent.trim()
    ) {
      return;
    }

    const cardInfo = {
      id: props.id,
      name: newName.current.textContent,
      user: props.user,
      text: String(
        newText.current.textContent.trim() == emptyText
          ? ""
          : newText.current.textContent
      ),
      comments: [],
    };

    context.trelloData.columns[props.columnId].content.splice(
      props.cardArrIdx,
      !props.newCard || isDelete ? 1 : 0,
      (() => {
        if (!isDelete) {
          return cardInfo;
        }
      })()
    );

    context.setTrelloData(storageService(context.trelloData));
    clickClose();
  }

  function escKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      setButtonVisibility({ display: "none" });
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
        <Back>
          <PopupCard>

            <ColumnTop>{props.columnName}</ColumnTop>
            <CloseButton
              onClick={clickClose}
              buttonStyle={buttonStyleEnum.ORANGE}
            >
              X
            </CloseButton>

            <CardName
              ref={newName}
              onBlur={restoreRefName}
              onFocus={clearRefName}
              contentEditable={true}
            >
              {props.name ? props.name : emptyName}
            </CardName>

            <Button
              onClick={(ev) => saveCard(ev)}
              buttonStyle={buttonStyleEnum.ORANGE}
              style={buttonVisibility}
            >
              Сохранить карточку
            </Button>

            <Author>Создал: {props.user}</Author>

            <Content>
              <ContHeader>Описание</ContHeader>

              <CardText
                ref={newText}
                onBlur={restoreRef}
                onFocus={clearRef}
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

            <Button
              onClick={(ev) => saveCard(ev, true)}
              buttonStyle={buttonStyleEnum.STRING_GREY}
              style={{ float: "right" }}
            >
              Удалить карточку
            </Button>
          </PopupCard>
        </Back>
      )}
    </Fragment>
  );
};

export default Card;

const CloseButton = styled(Button)`
  float: right;
  background-color: #b7a186;
`;

const Back = styled.div`
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
