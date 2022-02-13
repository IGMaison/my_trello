import React, {useContext, useState} from "react";
import styled from "styled-components";
import CommentList from "./comment_list";
import {buttonStyleEnum} from "../UI";
import {Context} from "../../context";
import {storageService} from "../services";
import {ContxtType} from "../../App";
import {settings} from "../../settings";
import {buttonStyle} from "../UI/button";

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
    const context: ContxtType = useContext<ContxtType>(Context);
    const emptyComment = settings.comments.newCommentPlaceholder;
    const [SaveCommentButtonVisibility, setSaveCommentButtonVisibility] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>("");

    const onNewCommentChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(ev.target.value);
        setSaveCommentButtonVisibility(!!ev.target.value);
    };

    const onNewCommentSubmit = (ev: React.SyntheticEvent) => {
        ev.preventDefault();
        if (!newComment) {
            return;
        }

        const newCommentInfo = {
            id: Date.now(),
            text: newComment,
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
                        placeholder={emptyComment}
                    />


                    {SaveCommentButtonVisibility && <Submit
                        type="submit"
                        name="submitNewComment"
                        buttonStyle={buttonStyleEnum.ORANGE}
                        value={settings.button.save}>
                    </Submit>}
                </form>
            </CommentNew>

            {comments.length
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
                : settings.comments.welcomeText}
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

const PostNew = styled.input`
  border: 0 white;
  box-sizing: border-box;
  &: hover {
    background-color: Azure;
  }
  &: focus {
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
  }
`;

const Submit = styled.input<{ buttonStyle: buttonStyleEnum }>`
     ${buttonStyle[buttonStyleEnum.BASE]}
     ${buttonStyle[buttonStyleEnum.ORANGE]}
`