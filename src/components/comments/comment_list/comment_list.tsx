import React, {Fragment, useContext, useState} from "react";
import styled from "styled-components";
import {Context} from "../../../context";
import {DataType, storageService} from "../../services";
import {Button} from "../../UI";
import {buttonStyleEnum} from "../../UI";
import {ContxtType} from "../../../App";
import {settings} from "../../../settings";
import {buttonStyle} from "../../UI/button";

type PropsType = {
    commentArrIdx: number;
    cardArrIdx: number;
    columnId: string;
    id: number;
    text: string;
    user: string;
};

const CommentList = (props: PropsType) => {
    const [isPostEditAbility, setIsPostEditAbility] = useState<boolean>(false);
    const [commentIsDeleted, setCommentIsDeleted] = useState<boolean>(false);
    const context: ContxtType = useContext(Context);
    const [comment, setComment] = useState<string>(props.text)

    function onNewCommentSubmit(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        setComment(ev.target.value)
    }

    function onCommentSubmit(ev: React.SyntheticEvent): void {
        ev.preventDefault();

        if (!comment) {
            onDeletePost()
            return;
        }

        const newComment = {
            id: props.id,
            text: comment,
            user: props.user,
        };

        context.setTrelloData(((): DataType => {
            context.trelloData.columns[props.columnId].content[
                props.cardArrIdx
                ].comments[props.commentArrIdx] = newComment;
            return storageService.setTrelloStorage(context.trelloData);
        })());
        setIsPostEditAbility(false);
    }

    function onDeletePost(): void {
        context.setTrelloData(((): DataType => {
            context.trelloData.columns[props.columnId].content[
                props.cardArrIdx
                ].comments.splice(props.commentArrIdx, 1);
            return storageService.setTrelloStorage(context.trelloData);
        })());
        setCommentIsDeleted(true);
    }

    return (
        <Fragment>
            {!commentIsDeleted && (
                <CommentBody>{settings.comments.author} {props.user}
                    <form onSubmit={onCommentSubmit}>

                        {isPostEditAbility ? <PostEdit
                                onChange={onNewCommentSubmit}
                                autoComplete={"off"}
                                name="newCommentName"
                                value={comment}
                            /> :
                            <Post contentEditable={isPostEditAbility}>
                                {comment}
                            </Post>}

                        <DeleteButton
                            onClick={onDeletePost}
                            buttonStyle={buttonStyleEnum.ORANGE}
                        >{settings.button.x}
                        </DeleteButton>

                        {!isPostEditAbility ?
                            <Button
                                onClick={() => {
                                    setIsPostEditAbility(true);
                                }}
                                buttonStyle={buttonStyleEnum.GREY}
                            >{settings.button.change}
                            </Button>
                            :
                            <Submit
                                type="submit"
                                name="submitEditComment"
                                buttonStyle={buttonStyleEnum.ORANGE}
                                value={settings.button.save}>
                            </Submit>
                        }
                    </form>
                </CommentBody>
            )}
        </Fragment>
    );
};

export default CommentList;

const CommentBody = styled.div`
  box-sizing: border-box;
  margin-top: 0.5rem;
  padding: 0;
  position: relative;
  width: 100%;
`;

const Post = styled.div`
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
  right: 0;
  height: 35px;
`

const PostEdit = styled.textarea`
  box-sizing: border-box;
  color: black;
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  padding: 8px;
  position: relative;
  border-radius: 5px;
  border: solid 1px #ddd;
  width: 693px;
  text-align: left;
  display: inline-block;
  background-color: white;
  resize: none;
  &:hover {
    background-color: Azure;
  }
`;

const Submit = styled.input<{ buttonStyle: buttonStyleEnum }>`
     ${buttonStyle[buttonStyleEnum.BASE]}
     ${buttonStyle[buttonStyleEnum.ORANGE]}
`;