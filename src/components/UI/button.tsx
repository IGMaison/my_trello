import React, {MouseEventHandler} from "react";
import styled from "styled-components";

type PropsType = {
    buttonStyle: buttonStyleEnum,
    children: string;
    style?: object;
    onClick: MouseEventHandler;
}
export const Button = (props: PropsType) => {
    return (
        <ButtonStyled {...props}/>)
};


export const ButtonStyled = styled.button`
   ${(): string => buttonStyle[buttonStyleEnum.BASE]}
   ${(props: PropsType): string => buttonStyle[props.buttonStyle]}
`;


export const enum buttonStyleEnum {
    BASE,
    STRING_GREY = 1,
    ORANGE,
    GREY
}

export const buttonStyle = {
    [buttonStyleEnum.BASE]: `
        font-size: 13px;
        font-weight: 400;  
        cursor: pointer;
        &:hover {
            background-color: lightblue;
        }
        &:active {
            background-color: skyblue;
        };
    `,

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