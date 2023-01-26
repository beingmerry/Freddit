import React from 'react';
import styled from 'styled-components';

import Votes from './Votes';
import { HDiv } from '../styled-components/Divs';

const CommentDiv = styled(HDiv)`
  border-bottom: 1px solid var(--grey);
`;

export default function Comment({ comment }) {
  const { id, content, created_at: postDate, num_likes: votes, user, 'voted?': userHasVoted } = comment;

  return (
    <CommentDiv>
      <Votes votes={votes} userHasVoted={userHasVoted} parent={{type: 'comment', id}}/>
      <div>
        <h5>{user.username} - {postDate.substring(0, 10)}</h5>
        <p>{content}</p>
      </div>
    </CommentDiv>
  );
}