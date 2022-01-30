import React from "react";
import styled from "styled-components";
import Comments from "../comments";
import ButtonString from "../IU/button_string";

const CardContent = () => {
  return (
    <Content>
      <Header>Описание</Header>
      <Button>Изменить</Button>
      <CardText contentEditable="true">Описание подробно</CardText>
      <Comments />
    </Content>
  );
};

export default CardContent;

const Button = styled(ButtonString)`
  background-color: #ddd;
`;
const Header = styled.h2`
  display: inline-block;
  margin-block: 0;
  margin: 1em 1em 0 0;
`;

const CardText = styled.div`
  margin: 1em;
  padding: 2px;
  border: #ccc 1px;
  border-style: none none solid solid;
`;

const Content = styled.div`
  margin: 0;
  padding: 0;
`;
