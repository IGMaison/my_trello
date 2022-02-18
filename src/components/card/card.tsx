import React, {useContext} from "react";
import styled from "styled-components";
import {Context} from "../../context";
import {CardType, ContxtType} from "../../types/types";
import {settings} from "../../settings";

type PropsType = {
    columnId: number,
    card: CardType
}

const Card : React.FC<PropsType> = ({columnId, card}) => {
    const context: ContxtType = useContext(Context);

    const onCardClick = () => {
        context.setCardModal({card: card, columnId: columnId, isNew:false});
        context.setIsCardVisible(true);
    }

    return (
        <CardBase
            onClick={onCardClick}>
            <CardName>{card.name}</CardName>

            <CardPropIcons>
                <span title={settings.card.cardInfoIconTitle}>{card.text ? settings.card.infoIcon : ""}</span>
                <span
                    title={settings.card.commentsNumberIconTitle}>{settings.card.commentsNumberIcon}
                    {card.comments.length}
                </span>
            </CardPropIcons>
        </CardBase>
    );
};

export default Card;

const CardBase = styled.div`
  border: 0 white;
  box-sizing: border-box;
  color: black;
  margin: 0.5em auto;
  font-size: 14px;
  overflow: hidden;
  padding: 8px;
  position: relative;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  width: 100%;
  min-height: 20px;
  text-decoration: none;
  text-align: left;

  &:hover {
    background-color: Azure;
  }

  &:active {
    background-color: lightCyan;
  }
`;

const CardName = styled.div`
  font-weight: 300;
  margin: 0;
  padding: 1px;
  font-size: 14px;
  line-height: 1.2em;
  position: relative;
  display: flow-root;
`;

const CardPropIcons = styled.div`
  color: black;
  margin: 0;
  padding: 0;
  font-size: 14px;
  overflow: hidden;
  position: relative;
`;
