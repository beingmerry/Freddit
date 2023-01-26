import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import PostBody from './PostBody';
import CommentSection from './CommentSection';

export default function Post() {
  const { post_id: postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then(r => {
        if (r.ok) {
          r.json().then(setPost);
        } else {
          r.json().then(console.log);
        }
      })
  }, [postId]);

  const handleNewComment = c => {
    const comments = post.sorted_comments;
    setPost({...post, sorted_comments: [...comments, c]});
  }

  return (
    <main>
      {post.id ? <PostBody post={post} /> : 'Loading...'}
      <hr />
      <CommentSection comments={post.sorted_comments || []} postId={post.id || -1} onComment={handleNewComment} />
    </main>
  );
}