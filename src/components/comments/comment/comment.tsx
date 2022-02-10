import React, {Fragment, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import { Context } from "../../../context";
import { storageService } from "../../services";
import { Button } from "../../UI";
import { buttonStyleEnum } from "../../UI";

type PropsType = {
  commentArrIdx: number;
  cardArrIdx: number;
  columnId: string;
  id: number;
  text: string;
  user: string;
};

const Comment = (props: PropsType) => {
  const [postEditAbility, setPostEditAbility] = useState(false);
  const [commentIsDeleted, setCommentIsDeleted] = useState(true);
  const context: any = useContext(Context);
  let commentRef = React.createRef<any>();

  useEffect(() => {
    if (postEditAbility) {
      commentRef.current.focus();
    }
  }, [postEditAbility]);

  function saveComment(): void {
    if (!commentRef.current.textContent.trim()) {
      return;
    }
    const newComment = {
      id: props.id,
      text: commentRef.current.textContent,
      user: props.user,
    };
    context.setTrelloData(() => {
      context.trelloData.columns[props.columnId].content[
        props.cardArrIdx
      ].comments[props.commentArrIdx] = newComment;
      return storageService(context.trelloData);
    });
    setPostEditAbility(false);
  }

  function deletePost(): void {
    context.setTrelloData(() => {
      context.trelloData.columns[props.columnId].content[
        props.cardArrIdx
      ].comments.splice(props.commentArrIdx, 1);
      return storageService(context.trelloData);
    });
    setCommentIsDeleted(false);
  }
  return (
    <Fragment>
      {commentIsDeleted && (
        <CommentBody>

          Автор коммента: {props.user}



          <Post ref={commentRef} contentEditable={postEditAbility}>
            {props.text}
          </Post><DeleteButton
            onClick={deletePost}
            buttonStyle={buttonStyleEnum.ORANGE}
        >X
        </DeleteButton>

          {!postEditAbility ? (
            <Button
              onClick={() => {
                setPostEditAbility(true);
              }}
              buttonStyle={buttonStyleEnum.GREY}
            >
              Изменить
            </Button>

          ) : (
            <></>
          )}
          {postEditAbility ? (
            <Button onClick={saveComment} buttonStyle={buttonStyleEnum.ORANGE}>
              Сохранить
            </Button>
          ) : (
            <></>
          )}
        </CommentBody>
      )}
    </Fragment>
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
  width: 693px;
  text-align: left;
  display: inline-block;
`;

const DeleteButton = styled(Button)`
  float: right;
  position:relative;
  top: 1px;
  right: 0px;
  height: 35px;
`