import React from "react";
import styled from "styled-components";
import CardName from "../card/card_name";
import StickerCont from "./sticker_cont";

const Sticker = () => {
  return (
    <StickerBase>
      <CardName />
      <StickerCont />
    </StickerBase>
  );
};

export default Sticker;

const StickerBase = styled.div`
  border: 0 white;
  box-sizing: border-box;
  color: black;
  margin: 1em auto;
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
`;
