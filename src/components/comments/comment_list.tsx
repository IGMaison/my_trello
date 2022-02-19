import React, {useContext, useState} from "react";
import styled from "styled-components";
import {buttonStyleEnum} from "../UI";
import {Context} from "../../context";
import {storageService} from "../../App";
import {settings} from "../../settings";
import {buttonStyle} from "../UI/button";
import {CommentType} from "../../types";
import {ContxtType} from "../../types/types";
import Comment from "./comment";


type PropsType = {
    columnId: number;
    cardId: number;
    comments: CommentType[];
}

const Comments : React.FC<PropsType> = ({comments, columnId, cardId,}) => {
    const context: ContxtType = useContext<ContxtType>(Context);

    const [SaveCommentButtonVisibility, setSaveCommentButtonVisibility] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>("");
    const [currComments, setCurrComments] = useState<CommentType[]>(comments)

    const onNewCommentChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(ev.target.value);
        setSaveCommentButtonVisibility(!!ev.target.value);
    };

    const onNewCommentSubmit = (ev: React.SyntheticEvent) => {
        ev.preventDefault();
        if (!newComment) {
            return;
        }

        const newCommentInfo: CommentType = {
            id: Date.now(),
            text: newComment,
            user: context.userName,
        };

        storageService.saveNewComment(columnId, cardId, newCommentInfo, context.trelloData)
        setNewComment("");
        setSaveCommentButtonVisibility(false);
    };


    return (
        <CommentsBlock>
            <h2>{settings.comments.name}</h2>

            <CommentNew>
                <form onSubmit={onNewCommentSubmit}>
                    <PostNew
                        onChange={onNewCommentChange}
                        autoComplete={"off"}
                        name="newCommentName"
                        value={newComment}
                        placeholder={settings.comments.newCommentPlaceholder}
                    />


                    {SaveCommentButtonVisibility && <Submit
                        type="submit"
                        name="submitNewComment"
                        buttonStyle={buttonStyleEnum.ORANGE}
                        value={settings.button.save}>
                    </Submit>}
                </form>
            </CommentNew>

            {currComments.map((comment: CommentType) => {
                return (
                    <Comment
                        key={comment.id}
                        setCurrComments={setCurrComments}
                        columnId={columnId}
                        cardId={cardId}
                        comment={comment}/>)
            })}
            {!!comments.length
                ? <></>
                : settings.comments.welcomeText}
        </CommentsBlock>
    );
}

export default Comments;

const CommentsBlock = styled.div`
  box-sizing: border-box;
  margin: 1em auto;
  font-size: 14px;
  padding: 0;
  position: relative;
  width: 100%;
  text-align: left;
  overflow-y: scroll;
  max-height: 50vh;
`;

const CommentNew = styled.div`
  box-sizing: border-box;
  margin-bottom: 2em;
  padding: 0;
  position: relative;
  width: 100%;
`;

const PostNew = styled.input`
  box-sizing: border-box;

  &:hover {
    background-color: Azure;
  }

  &:focus {
    background-color: white
  }

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

const Submit = styled.input<{ buttonStyle: buttonStyleEnum }>`
  ${buttonStyle[buttonStyleEnum.BASE]}
  ${buttonStyle[buttonStyleEnum.ORANGE]}
`