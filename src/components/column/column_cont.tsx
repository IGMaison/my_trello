import React from "react";
import styled from "styled-components";
import Sticker from "../sticker/sticker";
import Button from "./button_add_card";
import ColumnName from "./column_name";

const ColumnCont = () => {
  return (
    <Content>
      <ColumnName />
      <Sticker />
      <Button />
    </Content>
  );
};

export default ColumnCont;

const Content = styled.div`
  background-color: #ebecf0;
  padding: 8px;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  white-space: normal;
  width: 100%;
  max-width: 300px;
`;