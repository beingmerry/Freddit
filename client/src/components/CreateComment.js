import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AutosizeTextarea from './AutosizeTextarea';
import { PostButton } from '../styled-components/Button';

export default function CreateComment({ postId, onComment }) {
  const [text, setText] = useState('');
  const user = useSelector(state => state.user);

  const handleChange = e => {
    setText(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/users/${user.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: text,
        post_id: postId
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(onComment);
        } else {
          r.json().then(console.log);
        }
      })
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <AutosizeTextarea
        minRows={3}
        maxRows={10}
        value={text}
        onChange={handleChange}
      />
      <PostButton as='input' type='submit' value='Post' />
    </form>
  );
}