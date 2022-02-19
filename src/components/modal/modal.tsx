import React from "react";
import styled from "styled-components";

const Modal = ({children}: { children: React.FC }) => {

    return (
        <Background>
            {children}
        </Background>
    )
};

export default Modal;

const Background = styled.div`
  visibility: visible;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #0000008c;
`;
