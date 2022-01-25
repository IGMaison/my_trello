import React from "react";
import styled from "styled-components";

const Div = styled.div`
  color: black;
  margin: 0;
  padding: 0;
  font-size: 14px;
  overflow: hidden;
  position: relative;
`;
const CardName = (props: any) => {
  return <Div>Заголовок карточки</Div>;
};

export default CardName;
