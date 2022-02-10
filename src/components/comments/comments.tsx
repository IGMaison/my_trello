import React, { SyntheticEvent, useContext, useRef, useState } from "react";
import styled from "styled-components";
import CommentList from "./comment_list";
import { Button, buttonStyleEnum } from "../UI";
import { Context } from "../../context";
import { storageService } from "../services";
import {ContxtType} from "../../App";

type CommentsType = { id: number; text: string; user: string };

const Comments = ({
  comments,
  columnId,
  cardArrIdx,
}: {
  columnId: string;
  cardArrIdx: number;
  comments: Array<CommentsType>;
}) => {
  const context: ContxtType = useContext(Context);
  const emptyComment = "Коммент писать здесь";
  let newCommentRef = React.createRef<HTMLDivElement>();
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [newCommentColor, saveNewCommentColor] = useState("grey");

  const clearNewComment = (ev: SyntheticEvent) => {
    if (newCommentRef.current) {
      saveNewCommentColor("black");
    setButtonVisibility(true);
    if (!newCommentRef.current.textContent || newCommentRef.current.textContent.trim() == emptyComment) {
      newCommentRef.current.textContent = "";
    }}
  };

  const restoreNewComment = (ev: SyntheticEvent) => {
    if (newCommentRef.current) {
    if (!(newCommentRef.current.textContent && newCommentRef.current.textContent.trim())) {
      newCommentRef.current.textContent = emptyComment;
      setButtonVisibility(false);
    }
      saveNewCommentColor("grey");
    }
  };
  const saveNewComment = (ev: React.MouseEvent<Element>) => {
    if (!(newCommentRef.current && newCommentRef.current.textContent) ||
        (newCommentRef.current.textContent.trim() == emptyComment ||
      !newCommentRef.current.textContent.trim())
    ) {
      return;
    }

    const newCommentInfo = {
      id: Date.now(),
      text: newCommentRef.current.textContent,
      user: context.userName,
    };

    if (context.trelloData.columns[columnId].content[cardArrIdx].comments) {
      context.trelloData.columns[columnId].content[cardArrIdx].comments.push(
        newCommentInfo
      );
    } else {
      context.trelloData.columns[columnId].content[cardArrIdx].comments = [
        newCommentInfo,
      ];
    }

    context.setTrelloData(storageService.setTrelloStorage(context.trelloData));
    newCommentRef.current.textContent = emptyComment;
    setButtonVisibility(false);
  };

  return (
    <CommentsBlock>
      <h2>Комментарии</h2>

      <CommentNew color={newCommentColor}>
        <PostNew
          ref={newCommentRef}
          contentEditable="true"
          onBlur={restoreNewComment}
          onFocus={clearNewComment}
          color={newCommentColor}
        >
          {emptyComment}
        </PostNew>

        {buttonVisibility && <Button
          onClick={saveNewComment}
          buttonStyle={buttonStyleEnum.ORANGE}
        >
          Сохранить
        </Button>}
      </CommentNew>
      {comments
        ? comments.map((comment: CommentsType, idx, comments) => {
            let reverseIdx = comments.length - 1 - idx;
            return (
              <CommentList
                key={comments[reverseIdx].id}
                {...{
                  commentArrIdx: reverseIdx,
                  cardArrIdx: cardArrIdx,
                  columnId: columnId,
                  ...comments[reverseIdx],
                }}
              />
            );
          })
        : "Напишите свой комментарий."}
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
 margin-bottom: 2em;
  padding: 0;
  position: relative;
  width: 100%;
`;

const PostNew = styled.div`
  border: 0 white;
  box-sizing: border-box;
  color: ${({color}:{color:string}):string=>color};
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
  }
`;
