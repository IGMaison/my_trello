import React, {SyntheticEvent, useRef, useState} from "react";
import styled from "styled-components";
import Comment from "./comment";
import {Button, buttonStyleEnum} from "../UI";

type CommentsType = { id: number, text: string, user: string }


const Comments = ({comments}: { comments: Array<CommentsType> }) => {

    const emptyComment = "Коммент писать здесь";
    let newText = React.createRef<any>();
    const [buttonVisibility, setButtonVisibility] = useState({display: "none"});

    const clearRef = (ev: SyntheticEvent) => {
        newText.current.style.color = 'black';
        setButtonVisibility({display: "block"});
        if (newText.current.textContent.trim() == emptyComment) {
            newText.current.textContent = ""
            console.log(newText.current);
        }
    };

    const restoreRef = (ev: SyntheticEvent) => {
        if (!newText.current.textContent.trim()) {
            newText.current.textContent = emptyComment;
            setButtonVisibility({display: "none"});
        }
        newText.current.style.color = 'grey';
    };
    const saveNewComment = (ev: React.MouseEvent<Element>) => {
        console.log("inner", newText.current.textContent);
    }


    return (
        <CommentsBlock>
            <h2>Комментарии</h2>
            <CommentNew>
                <PostNew ref={newText} contentEditable="true"
                         onBlur={restoreRef}
                         onFocus={clearRef}>{emptyComment}
                </PostNew>
                <Button onClick={saveNewComment} style={buttonVisibility}
                        buttonStyle={buttonStyleEnum.ORANGE}>Сохранить</Button>
                <br/>
                <br/>
            </CommentNew>
            {comments ? comments.map((comment: any) => <Comment
                key={comment.id} {...comment}/>) : 'Напишите свой комментарий.'}
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
