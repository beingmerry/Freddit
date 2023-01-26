import React from 'react';
import styled from 'styled-components';

import { PostLi } from '../styled-components/PostLi';
import PostCard from './PostCard';

const PostOrderedList = styled.ol`
  list-style: none;
  padding-left: 0px;
`;

export default function PostList({ posts }) {
  const postElements = posts.map((p, index) =>
    <PostLi key={index}>
      <PostCard position={index + 1} post={p} />
    </PostLi>
  );

  return (
    <>
      {postElements.length > 0
        ? (<PostOrderedList>
            {postElements}
          </PostOrderedList>)
        : <h1>Could not fetch any posts.</h1>
      }
    </>
  );
}