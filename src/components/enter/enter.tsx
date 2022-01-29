import React from "react";
import styled from "styled-components";
import {JsxAttribute, JsxElement} from "typescript";

const Enter = () => {
    return (
        <Back>
            <Popup>
                <form>
                    <Input name="userName" placeholder="Введите ваше имя здесь."/>
                    <Submit type="submit" value={`Далее >`} onSubmit={() => {}}/>
                </form>
            </Popup>
        </Back>
    );
};

export default Enter;

const Back = styled.div`
  visibility: visible;
  position: absolute;
  min-width: 100%;
  min-height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #0000008c;
`;

const Popup = styled.div`
  background-color: #ebecf0;
  padding: 1.5em;
  border-radius: 3px;
  box-sizing: border-box;
  width: 500px;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  height: fit-content;
`;

const Input = styled.input`
  ::placeholder {
    color: #f004;
  }
  autofocus: true;
  placeholder: "placeholder";
  background-color: #fff;
  overflow-wrap: break-word;
  font-size: 24px;
  line-height: 1em;
  width: 100%;
`;

const Submit = styled.input`
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