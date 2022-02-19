import React, {SyntheticEvent, useContext, useState} from "react";
import styled from "styled-components";
import {settings} from "../../settings";
import {storageService} from "../../App";
import {Context} from "../../context";


const Enter = () => {
    const [name, changeName] = useState("");

    const context = useContext(Context)


    const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        changeName(ev.target.value);
    };

    const onSubmit = (ev: SyntheticEvent) => {
        if (name.trim()) {
            context.setUserName(name.replace(/\s+/g, ' ').trim());
            storageService.initTrelloData()
            context.setIsModalVisible(false);
            context.setModalContent(() => <></>)
        }
        ev.preventDefault();
    };

    return (
        <EnterBase>
            <form onSubmit={onSubmit}>
                <Input
                    onChange={onChange}
                    value={name}
                    name="userName"
                    placeholder={settings.enter.placeholder}
                />
                <Submit type="submit" value={settings.button.next}/>
            </form>
        </EnterBase>
    );
};

export default Enter;

const Input = styled.input`
  ::placeholder {
    color: #f004;
  }

  background-color: #fff;
  overflow-wrap: break-word;
  font-size: 24px;
  line-height: 1em;
  width: 400px;
`;

const Submit = styled.input`
  display: block;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  border-radius: 3px;
  background-color: #e91;
  color: #fff;
  border: 0 solid;

  &:hover {
    background-color: lightblue;
  }

  &:active {
    background-color: skyblue;
  }
`;

const EnterBase = styled.div`
  background-color: #ebecf0;
  padding: 1.5em;
  border-radius: 3px;
  box-sizing: border-box;
  width: fit-content;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  height: fit-content;
`;
