import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginForm from './LoginForm';
import MiniProfile from './MiniProfile';
import { Button } from '../styled-components/Button'

const Aside = styled.aside`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  right: 0px;
  width: 20%;
  max-width: 250px;
  padding: 0 0.5em;
`

export default function Sidebar () {
  const user = useSelector(state => state.user)
  return (
    <Aside>
      {user.id ? <MiniProfile /> : <LoginForm />}
      <Link to='/new-post'>
        <Button>Submit a new post</Button>
      </Link>
    </Aside>
  )
}
