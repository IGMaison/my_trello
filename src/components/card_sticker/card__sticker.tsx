import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../context";
import {ContxtType} from "../../App";
import {CardContent} from "../services/storage_service";

const CardSticker = (cardInfo: CardContent & {newCard:boolean; columnId:string; cardArrIdx: number}) => {
  const context: ContxtType = useContext(Context);

    /**
     *
     * TODO: я уже говорил как стоит називать обработчики
     * или onCardStickerClick() или cardStickerClickHandler()
     * с большой буквы именуются только компоненты
     */
  function CardStickerClick(): void {
    context.setCardContent(cardInfo);
    context.setCardStatus(true);
  }

  /**TODO: почему эта переменная is если она не boolean?
     спецсимволы все равно мне ни о чем не говрят, ты сможешь через неделю по памяти сказать что такое &#9776; ?
   **/
  let isCardInfo = cardInfo.text ? <>&#9776;&nbsp;&nbsp;&nbsp;</> : "";
  let commentsNumber = cardInfo.comments ? (
    <>&#9993; {cardInfo.comments.length}</>
  ) : (
    0
  );

  return (
    <StickerBase onClick={CardStickerClick}>
      <CardName>{cardInfo.name}</CardName>

      <StickerProp>
          <span title={"Наличие описания"}>{isCardInfo}</span>
          <span title={"Количество комментариев"}>{commentsNumber}</span>
      </StickerProp>
    </StickerBase>
  );
};

export default CardSticker;

const StickerBase = styled.div`
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

const StickerProp = styled.div`
  color: black;
  margin: 0;
  padding: 0;
  font-size: 14px;
  overflow: hidden;
  position: relative;
`;
