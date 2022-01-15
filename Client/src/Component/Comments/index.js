import React from 'react';
import CommentForm from '../CommentForm';

const Comments = ({ comment, replies, activeComment, setActiveComment, addComment, currentUserId, parentid = 0 ,role,infoAss,addFinalDecision}) => {
    const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
    const isDecisioning = activeComment && activeComment.id === comment.id && activeComment.type === "decisioning";
    const replyId = (parentid!==0 )? parentid : comment.id;
    const createdAt = new Date(comment.createat).toLocaleDateString();
    const handleCancel = () => {
        setActiveComment(null);
    }

    return (
        <div key={Math.random().toString(36).substring(2,10)} className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                <div className="comment-text">{comment.comment}</div>
                <div className="comment-actions">
                    <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>Reply</div>
                    {(role==='teacher')?(<div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: "decisioning" })}>Final Decision</div>):('')}
                </div>
                    
                {isReplying &&
                    (<CommentForm submitLabel="Reply" addComment={(text) => addComment(text, replyId)} handleCancel={handleCancel} infoAss={infoAss} />)}

                {isDecisioning &&
                    (<CommentForm submitLabel="Decision" addComment={(text) => addComment(text, replyId)} addFinalDecision={(text) => addFinalDecision(text, replyId)}  handleCancel={handleCancel} infoAss={infoAss} />)}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comments
                                comment={reply}
                                key={Math.random().toString(36).substring(2,10)}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                addComment={addComment}
                                addFinalDecision={addFinalDecision}
                                parentid={comment.id}
                                replies={[]}
                                currentUserId={currentUserId}
                                role={role}
                                infoAss={infoAss}
                            />
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}

export default Comments;
