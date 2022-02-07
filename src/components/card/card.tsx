import React, {Fragment, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "../UI";
import {buttonStyleEnum} from "../UI";
import Comments from "../comments";
import {Context} from "../../context";

type CommentsType = { id: number, text: string, user: string }

type PropsType = {
    // TODO: можно писать не Array<CommentsType>, а CommentsType[]
    comments: Array<CommentsType>,
    id: number,
    columnId: string;
    name: string,
    text: string,
    user: string,
    hideComments?: boolean,
    cardStatus: boolean,
    //TODO: Function должны быть явно типизированы
    setCardContent: Function
    setCardStatus: Function
}

const Card = (props: PropsType) => {
    //TODO: any
    const context: any = useContext(Context);

    //TODO: консоль логи?
    console.count("Card");
    console.log("ci", props);
    //TODO: зачем эти константы?
    const emptyText = "Подробного описания нет, но прямо здесь его можно написать.";
    const emptyName = "Новый заголовок";
    //TODO: два раза рефы any, и сам нейминг рефов, как будто бы ты их используешь не по назначению рефа,
    // в рефах должны лежать компоненты а не строчки
    let newText = React.createRef<any>();
    let newName = React.createRef<any>();
    //TODO: опять стейт со стилями
    const [buttonVisibility, setButtonVisibility] = useState({display: "none"});

    //TODO: нейминги ни говорящие ни о чем
    const clearRef = () => {
        newText.current.style.backgroundColor = 'white';
        setButtonVisibility({display: "block"})
        if (newText.current.textContent.trim() == emptyText) {
            newText.current.textContent = ""
        }
    };

    const restoreRef = () => {
        if (!newText.current.textContent.trim()) {
            newText.current.textContent = emptyText;
        }
        newText.current.style.backgroundColor = '#ebecf0';
    };

    //TODO: наверное это onClose и setVisibility должен работать с boolean стейтом
    const clickClose = () => {
        setButtonVisibility({display: "none"});
        props.setCardStatus(false);
    }

    //TODO: такая же беда как и выше с функциями по рефам
    const restoreRefName = () => {
        if (!newName.current.textContent.trim()) {
            newName.current.textContent = emptyName;
            setButtonVisibility({display: "none"});
        }
        newName.current.style.backgroundColor = '#ebecf0';
    };
    const clearRefName = () => {
        newName.current.style.backgroundColor = 'white';
        setButtonVisibility({display: "block"})
        if (newName.current.textContent.trim() == emptyName) {
            newName.current.textContent = ""
        }
    };

    function saveCard() {
        if (newName.current.textContent.trim() == emptyName || !newName.current.textContent.trim()) {
            return
        }
        const newCardInfo = {
            id: props.id,
            name: newName.current.textContent,
            user: props.user,
            text: newText.current.textContent.trim() == emptyText ? '' : newText.current.textContent,
        }
        context.trelloData.columns[props.columnId].content.push(newCardInfo);

        clickClose()
    }

    useEffect(() => {
        function escKeyDown(ev: KeyboardEvent) {
            if (ev.key === "Escape") {
                setButtonVisibility({display: "none"});
                props.setCardStatus(false);

                console.log("sss", props.cardStatus)
            }
        }

        document.addEventListener("keydown", escKeyDown);
        return () => {
            document.removeEventListener("keydown", escKeyDown);
        };
    }, [1]);

    //TODO: блоки верстки лучше разделять пробелами по логическим блокам
    return (
        <Fragment>
            {props.cardStatus && <Back>
                <PopupCard>
                    <Button onClick={clickClose}
                            buttonStyle={buttonStyleEnum.ORANGE}
                            style={{float: "right"}}
                    >X</Button>
                    <CardName ref={newName}
                              onBlur={restoreRefName}
                              onFocus={clearRefName}
                              contentEditable={true}>
                        {props.name ? props.name : emptyName}
                    </CardName>
                    <Button onClick={saveCard}
                            buttonStyle={buttonStyleEnum.ORANGE}
                            style={buttonVisibility}>
                        Сохранить карточку
                    </Button>
                    <Author>Создал: {props.user}</Author>
                    <Content>
                        <ContHeader>Описание</ContHeader>
                        <CardText ref={newText}
                                  onBlur={restoreRef}
                                  onFocus={clearRef}
                                  contentEditable="true">
                            {props.text ? props.text : emptyText}
                        </CardText>
                        {props.hideComments || <Comments comments={props.comments}/>}
                    </Content>
                    <Button onClick={() => {
                    }}
                            buttonStyle={buttonStyleEnum.STRING_GREY}
                            style={{float: "right"}}>
                        Удалить карточку</Button>
                </PopupCard>
            </Back>}
        </Fragment>
    );
};

export default Card;

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

