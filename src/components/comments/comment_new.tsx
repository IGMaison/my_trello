import React from "react";
import styled from "styled-components";
import { ButtonStringOrange } from "../IU";

const CommentNew = () => {
  return (
    <CommentBody>
      <Post contentEditable="true">Тут будет новый коммент</Post>
      <ButtonStringOrange>Сохранить</ButtonStringOrange>
      <br />
      <br />
    </CommentBody>
  );
};

export default CommentNew;

const CommentBody = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
`;

const Post = styled.div`
  border: 0 white;
  box-sizing: border-box;
  color: grey;
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  padding: 8px;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  border: solid 1px #daa;
  width: 100%;
  text-align: left;
`;
