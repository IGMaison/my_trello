import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import styled from "styled-components";
import {Context} from "../../../context";
import {Button} from "../../UI";
import {buttonStyleEnum} from "../../UI";
import {storageService} from "../../../App";
import {settings} from "../../../settings";
import {buttonStyle} from "../../UI/button";
import {CommentType, DataType} from "../../../types";
import {ContxtType} from "../../../types/types";

type PropsType = {
    cardId: number;
    trelloData: DataType;
    comment: CommentType
    setCurrComments: Dispatch<SetStateAction<CommentType[]>>
};

const Comment : React.FC<PropsType> = ({...props}) => {
    const [isPostEditAbility, setIsPostEditAbility] = useState<boolean>(false);
    const context: ContxtType = useContext(Context);
    const [commentText, setCommentText] = useState<string>(props.comment.text)

    function onNewCommentChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        setCommentText(ev.target.value)
    }

    function onCommentSubmit(ev: React.SyntheticEvent): void {
        ev.preventDefault();

        if (!commentText) {
            onDeletePost()
            return;
        }

        const newComment = {
            id: props.comment.id,
            text: commentText,
            user: props.comment.user,
            cardId: props.cardId
        };

        storageService.editComment(newComment, props.trelloData)
        setIsPostEditAbility(false);
    }

    function onDeletePost() {
        storageService.deleteComment(props.comment.id, context.trelloData);
        props.setCurrComments(props.trelloData.comments.filter((comment)=>comment.cardId === props.cardId))
    }

    function onEditCommentClick () {
        setIsPostEditAbility(true)
    }


    return (
        <CommentBody>{settings.comments.author} {props.comment.user}
            <form onSubmit={onCommentSubmit}>

                {isPostEditAbility ? <PostEdit
                        onChange={onNewCommentChange}
                        autoComplete={"off"}
                        name="newCommentName"
                        value={commentText}
                    /> :
                    <Post contentEditable={isPostEditAbility}>
                        {commentText}
                    </Post>}


                {!isPostEditAbility ?
                    <Button
                        onClick={onEditCommentClick}
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
            <DeleteButton
                onClick={onDeletePost}
                buttonStyle={buttonStyleEnum.ORANGE}
            >{settings.button.x}
            </DeleteButton>
        </CommentBody>
    );
};

export default Comment;

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
  width: 96%;
  text-align: left;
  display: inline-block;
`;

const DeleteButton = styled(Button)`
  float: right;
  position: relative;
  top: -59px;
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