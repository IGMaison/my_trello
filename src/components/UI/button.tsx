import React from "react";
import styled from "styled-components";

type PropsType = {
    buttonStyle: buttonStyleEnum,
    children: string;
    style?: object;
}
const Button = (props: PropsType) => {
    return (
        <ButtonStyled {...props}/>)
};

export default Button;
export {buttonStyleEnum}

const ButtonStyled = styled.button<PropsType>`
  font-size: 13px;
  font-weight: 400;  
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: skyblue;
  };
   ${(props: PropsType): string => {
    return buttonStyle[props.buttonStyle];

}};
`;

const enum buttonStyleEnum {
    STRING_GREY = 1,
    ORANGE,
    GREY
}

const buttonStyle = {
    [buttonStyleEnum.STRING_GREY]: `
        color: #5e6c84;
        text-align: left;
        border: none;
        `
    ,
    [buttonStyleEnum.ORANGE]: `
        border-radius: 3px;
        background-color: #e91;
        color: #fff;
        border: 0px solid;
        `
    ,
    [buttonStyleEnum.GREY]: `
        color: #5e6c84;
        text-align: left;
        border: none;
        background-color: #ddd;
        `
    ,
};