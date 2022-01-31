import React from "react";
import styled from "styled-components";
import { ButtonStringOrange } from "../../UI";
import { Button } from "../../UI";

const Comment = () => {
  return (
    <CommentBody>
      Автор коммента:Автор
      <ButtonDel>X</ButtonDel>
      <Post contentEditable="true">Коммент</Post>
      <Button>Изменить</Button>
      <ButtonStringOrange>Сохранить</ButtonStringOrange>
      <br />
      <br />
    </CommentBody>
  );
};

export default Comment;

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
  color: black;
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  padding: 8px;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  border: solid 1px #ddd;
  width: 100%;
  text-align: left;
`;

const ButtonDel = styled(ButtonStringOrange)`
  float: right;
`;
