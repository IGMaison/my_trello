import React from "react";
import styled from "styled-components";

const Button = () => {
  return <AddButton>+ Добавить карточку</AddButton>;
};

export default Button;

const AddButton = styled.button`
  font-size: 14px;
  font-weight: 400;
  color: #5e6c84;
  text-align: left;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: skyblue;
  }
`;
