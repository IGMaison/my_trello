import React, { SyntheticEvent, useContext, useRef, useState } from "react";
import styled from "styled-components";
import Comment from "./comment";
import { Button, buttonStyleEnum } from "../UI";
import { Context } from "../../context";
import { storageService } from "../services";

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
  const context: any = useContext(Context);
  const emptyComment = "Коммент писать здесь";
  let newComment = React.createRef<any>();
  const [buttonVisibility, setButtonVisibility] = useState({ display: "none" });

  const clearNewComment = (ev: SyntheticEvent) => {
    newComment.current.style.color = "black";
    setButtonVisibility({ display: "block" });
    if (newComment.current.textContent.trim() == emptyComment) {
      newComment.current.textContent = "";
    }
  };

  const restoreNewComment = (ev: SyntheticEvent) => {
    if (!newComment.current.textContent.trim()) {
      newComment.current.textContent = emptyComment;
      setButtonVisibility({ display: "none" });
    }
    newComment.current.style.color = "grey";
  };
  const saveNewComment = (ev: React.MouseEvent<Element>) => {
    if (
      newComment.current.textContent.trim() == emptyComment ||
      !newComment.current.textContent.trim()
    ) {
      return;
    }

    const newCommentInfo = {
      id: Date.now(),
      text: newComment.current.textContent,
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

    context.setTrelloData(storageService(context.trelloData));
    newComment.current.textContent = emptyComment;
    setButtonVisibility({ display: "none" });
  };

  return (
    <CommentsBlock>
      <h2>Комментарии</h2>

      <CommentNew>
        <PostNew
          ref={newComment}
          contentEditable="true"
          onBlur={restoreNewComment}
          onFocus={clearNewComment}
        >
          {emptyComment}
        </PostNew>

        <Button
          onClick={saveNewComment}
          style={buttonVisibility}
          buttonStyle={buttonStyleEnum.ORANGE}
        >
          Сохранить
        </Button>
        <br />
        <br />
      </CommentNew>
      {comments
        ? comments.map((comment: CommentsType, idx, comments) => {
            let reverseIdx = comments.length - 1 - idx;
            return (
              <Comment
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
  }
`;
