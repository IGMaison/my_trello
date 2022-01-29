import React from "react";
import styled from "styled-components";

const ButtonString = styled.button`
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
export default ButtonString;
