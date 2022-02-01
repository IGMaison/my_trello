import React from "react";
import styled from "styled-components";
import  {Button} from "../../UI";
import {buttonStyleEnum} from "../../UI";

const Comment = () => {
  return (
    <CommentBody>
      Автор коммента:Автор
      <Button buttonStyle={buttonStyleEnum.ORANGE} style={{float: "right"}}>X</Button>
      <Post contentEditable="true">Коммент</Post>
      <Button buttonStyle={buttonStyleEnum.GREY}>Изменить</Button>
      <Button buttonStyle={buttonStyleEnum.ORANGE}>Сохранить</Button>
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

