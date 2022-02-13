import React, {SetStateAction, SyntheticEvent, useState} from "react";
import styled from "styled-components";
import {DataType, storageService} from "../services";
import {settings} from "../../settings";

type Props = {
    changeUserName: React.Dispatch<SetStateAction<string>>
    setData: React.Dispatch<SetStateAction<DataType>>;
};
const Welcome = ({changeUserName, setData}: Props) => {
    const [name, changeName] = useState("");

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        changeName(ev.target.value);
    };

    const [isVisible, setIsVisible] = useState<boolean>(true);

    const onSubmit = (ev: SyntheticEvent) => {
        if (name.trim()) {
            changeUserName(name.replace(/\s+/g, ' ').trim());
            setData(storageService.getTrelloStorage);
            setIsVisible(false);
        }
        ev.preventDefault();
    };

    return (
        (isVisible) ? <WelcomeBackground>
            <Popup>
                <form onSubmit={onSubmit}>
                    <Input
                        onChange={onChange}
                        value={name}
                        name="userName"
                        placeholder={settings.welcome.placeholder}
                    />
                    <Submit type="submit" value={settings.button.next}/>
                </form>
            </Popup>
        </WelcomeBackground>
        :
        <></>
    );
};

export default Welcome;

const WelcomeBackground = styled.div`
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
