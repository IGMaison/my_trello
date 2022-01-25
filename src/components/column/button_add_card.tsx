import React from "react";
import styled from "styled-components";

const AddButton = styled.button`
  font-size: 14px;
  font-weight: 400;
  color: #5e6c84;
  text-align: left;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &:active {
    background-color: #ccc;
  }
`;

const Button = (props: any) => {
  return <AddButton>+ Добавить карточку</AddButton>;
};

export default Button;
