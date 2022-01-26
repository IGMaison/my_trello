import React from "react";
import styled from "styled-components";
import { JsxAttribute, JsxElement } from "typescript";
import CardContent from "./card_content";
import CardName from "./card_name";

const Card = () => {
  return (
    <Back>
      <PopupCard>
        <CardName weight="700" size="24px"  />
        <CardContent />
      </PopupCard>
    </Back>
  );
};

export default Card;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0000008c;
`;

const PopupCard = styled.div`
  background-color: #ebecf0;
  padding: 8px;
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

