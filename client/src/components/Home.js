import React, {useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PostList from './PostList';
import NavBar from './NavBar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch('/posts')
      .then(r => {
        if (r.ok) {
          r.json().then( data => { setPosts(data) } );
        } else {
          r.json().then(console.log);
        }
      })
  }, [user.id]);

  return (
    <main>
      <span>Popular posts</span>
      <NavBar />
      <hr />
      <PostList posts={posts} />
    </main>
  );
}