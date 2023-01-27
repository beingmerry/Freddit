import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../features/loginModal/loginModalSlice';

const VotesContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--grey);
`;

const VoteButton = styled.button`
  font-weight: bold;
  font-size: 1em;
  background-color: transparent;
  border: none;
  color: inherit;

  &:hover {
    cursor: pointer;
  }

  &.down.downvote {
    color: red;
  }

  &.up.upvote {
    color: #0D0;
  }
`;

const VOTE_CLASS = {
  '-1': 'downvote',
  '1': 'upvote',
  '0': ''
};

export default function Votes({ votes, userHasVoted, parent }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [voteData, setVoteData] = useState({voteCount: votes, userHasVoted: userHasVoted});
  
  const handleVote = (vote) => {
    if (!user.id) {
      return dispatch(showLoginModal());
    }

    if (voteData.userHasVoted === vote) {
      voteDelete();
    } else {
      votePost(vote);
    }
  }

  const votePost = (vote) => {
    fetch(`/api/users/${user.id}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [`${parent.type}_id`]: parent.id,
        vote
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(likeData => {
            updateVoteData(likeData);
          });
        } else {
          r.json().then(console.log);
        }
      });
  }

  const voteDelete = () => {
    fetch(`/api/users/${user.id}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [`${parent.type}_id`]: parent.id,
      }),
    })
      .then(r => {
        if (r.ok) {
          r.json().then(likeData => {
            updateVoteData(likeData);
          });
        } else {
          r.json().then(console.log);
        }
      })
  }

  const updateVoteData = data => {
    setVoteData({
      voteCount: data['post_or_comment']['num_likes'],
      userHasVoted: data['post_or_comment']['voted?']
    });
  }

  useEffect(() => {
    setVoteData({voteCount: votes, userHasVoted: userHasVoted});
  }, [votes, userHasVoted])

  return (
    <VotesContainer>
      <VoteButton
        onClick={() => handleVote(1)}
        className={`up ${VOTE_CLASS[voteData.userHasVoted]}`}
      >⇧</VoteButton>
      <div>{voteData.voteCount}</div>
      <VoteButton
        onClick={() => handleVote(-1)}
        className={`down ${VOTE_CLASS[voteData.userHasVoted]}`}
      >⇩</VoteButton>
    </VotesContainer>
  );
}