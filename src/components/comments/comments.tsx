import React from "react";
import styled from "styled-components";
import { ButtonString } from "../IU";
import Comment from "./comment";
import CommentNew from "./comment_new";

const Comments = () => {
  return (
    <CommentsBlock>
      <h2>Комментарии</h2>
      <CommentNew />
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
