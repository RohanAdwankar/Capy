import React, { useState } from 'react';

const Post = ({title, content}) => {
    const [likes, setLikes] = useState(0);
    const [showComments, setShowComments] = useState(false);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <div>
                <button onClick={handleLikeClick}>like ({likes})</button>
                <button onClick={handleCommentClick}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
            </div>
            {showComments && (
                <div>
                    <h3>Comments</h3>
                </div>
            )}
        </div>

    );
};

export default Post;