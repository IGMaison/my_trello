import React from "react";
import styled from "styled-components";

interface Style {
    contentEditable: boolean,
    weight: number,
    size: string,
}

const CardName = (props: Style | {}) => {
    return (
        <Name {...props}>
            Заголовок карточки
        </Name>
    );
};

export default CardName;

const Name = styled.div<Style | {}>`
  font-weight: ${(props: Style | {}): number => {
    return ('weight' in props) ? props.weight : 300;
}};
  margin: 0;
  padding: 1px;
  font-size: ${(props: Style | {}): string => {
    return 'size' in props ? props.size : "14px";
}};
  line-height: 1.2em;
  position: relative;
  display: flow-root;
`;
