import React from "react";
import styled from "styled-components";

interface DivProps {
  readonly size: string;
}

const Div = styled.div<DivProps>`
  color: black;
  margin: 0;
  padding: 0;
  font-size: ${(props: any) => {
    return props.size || "14px";
  }};
  position: relative;
`;

const CardName = (props: any) => {
  return <Div size={props.size}>Заголовок карточки</Div>;
};

export default CardName;
