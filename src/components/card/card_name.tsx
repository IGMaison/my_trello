import React from "react";
import styled from "styled-components";

const CardName = (props: any) => {
  return <Name style={props}>Заголовок карточки</Name>;
};

export default CardName;

const Name = styled.div<any>`
  font-weight: ${(props: any) => {
    return props.style.weight || "";    
  }};
  margin: 0;
  padding: 0;
  font-size: ${(props: any) => {
    return props.style.size || "14px";
  }};
  position: relative;
  
`;
