import React, {useContext} from "react";
import styled from "styled-components";
import {Context} from "../../context";


const CardSticker = ({cardInfo}: { cardInfo: any }) => {
   const context: any = useContext(Context);
   function CardStickerClick () : void {
       context.setCardStatus(true);
       context.setCardContent(cardInfo);
   }

    return (
        <StickerBase onClick={CardStickerClick}>
            <CardName>{cardInfo.name}</CardName>
            <StickerProp>{(cardInfo.comments) ? <>&#9776;&nbsp;&nbsp;&nbsp;</> : ''}
                &#128386; {(cardInfo.comments) ? cardInfo.comments.length : 0}</StickerProp>
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
  };
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
