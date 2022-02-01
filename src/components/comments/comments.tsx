import React from "react";
import styled from "styled-components";
import Comment from "./comment";
import {Button, buttonStyleEnum} from "../UI";

const Comments = () => {
  return (
    <CommentsBlock>
      <h2>Комментарии</h2>
      <CommentNew>
          <PostNew contentEditable="true">Тут будет новый коммент</PostNew>
          <Button buttonStyle={buttonStyleEnum.ORANGE}>Сохранить</Button>
          <br />
          <br />
      </CommentNew>
      <Comment />
      <Comment />
    </CommentsBlock>
  );
};

export default Comments;

const CommentsBlock = styled.div`
  box-sizing: border-box;
  margin: 1em auto;
  font-size: 14px;
  padding: 0;
  position: relative;
  width: 100%;
  text-align: left;
`;

const CommentNew = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
`;

const PostNew = styled.div`
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
