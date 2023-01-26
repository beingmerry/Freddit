import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostList from './PostList'

export default function Profile () {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [posts, setPosts] = useState([])
  const user = useSelector(state => state.user)
  const { id } = useParams()
  useEffect(() => {
    fetch(`/users/${id}/posts`).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUserName(data[0].user.username)
          data[0].user.username === user.username
            ? setUserEmail(data[0].user.email)
            : setUserEmail('')
          console.log(data)
          setPosts(data)
        })
      } else {
        console.log(res.errors)
      }
    })
    // eslint-disable-next-line
  }, [])
  return (
    <main>
      {userName === user.username ? (
        <>
          <p>🟢 Logged In As...</p>
          <h3>Email: {userEmail}</h3>
          <hr />
        </>
      ) : (
        <p>🟡 Viewing User...</p>
      )}
      <h1>{userName}</h1>
      <hr />
      <h3>Posts</h3>
      <PostList posts={posts} />
      <hr />
    </main>
  )
}
