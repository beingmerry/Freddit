import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Comment from './Comment';
import CreateComment from './CreateComment';
import SignupButton from './SignupButton';
import { Section } from '../styled-components/Divs';

const CommentList = styled.ul`
  list-style: none;
`;

export default function CommentSection({ postId, comments, onComment }) {
  const user = useSelector(state => state.user);

  const commentElements = comments.map((c, idx) =>
    <Comment key={`comment-${idx}`} comment={c}/>
  );

  return (
    <Section>
      <h4>Want to add to the discussion?</h4>
      {user.username ? <CreateComment postId={postId} onComment={onComment} /> : <SignupButton />}
      <h4>Comments</h4>
      <CommentList>
        {commentElements}
      </CommentList>
    </Section>
  );
}