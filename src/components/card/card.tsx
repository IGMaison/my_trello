import React from "react";
import styled from "styled-components";
import CardName from "./card_name";

const Div = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Popup = styled.div`
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
  min-height: 768px;
`;

const Card = (props: any) => {
  return (
    <Div>
      <Popup>
        <CardName size="24px" />
      </Popup>
    </Div>
  );
};

export default Card;
