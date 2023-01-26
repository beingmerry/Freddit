import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../styled-components/Button'
import { logout } from '../features/user/userSlice'
import { UserNameLink } from '../styled-components/UserNameLink'

const ProfileDiv = styled.div`
  width: 100%;
`

export default function MiniProfile () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  function handleLogout () {
    fetch('/logout', {
      method: 'DELETE'
    }).then(() => dispatch(logout()))
  }
  return (
    <ProfileDiv>
      <h2>
        Welcome,{' '}
        <UserNameLink to={`/users/${user.id}`}>{user.username}</UserNameLink>
        <br />
        <Button onClick={() => handleLogout()}>Logout</Button>
      </h2>
      <hr />
    </ProfileDiv>
  )
}
