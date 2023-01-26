import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import PostList from './PostList';
import { Button } from '../styled-components/Button';

const TopicTitle = styled.h3`
  margin: 0.5em 0;
`;

const PostButton = styled(Button)`
  margin-left: 1em;
`;

export default function Topic() {
  const { topic_name: topicName } = useParams();
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch(`/api/posts?topic_name=${topicName}`)
      .then(r => {
        if (r.ok) {
          r.json().then(setPosts);
        } else {
          r.json().then(console.log);
        }
      })
  }, [topicName, user]);

  return (
    <main>
      <TopicTitle>{topicName}</TopicTitle>
      {/* <p>This is an example of a topic description, instead of it being typed out like this I would hope it would be dynamically generated.</p> */}
      <Link to="new-post">
        <PostButton>Post to {topicName}</PostButton>
      </Link>
      <hr />
      <PostList posts={posts} />
    </main>
  );
}