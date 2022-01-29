import React from "react";
import styled from "styled-components";

const ButtonStringOrange = styled.button`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  border-radius: 3px;
  background-color: #e91;
  color: #fff;
  border: 0px solid;
  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: skyblue;
  }
`;
export default ButtonStringOrange;
