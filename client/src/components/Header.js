import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/fr-logo.png'

import SignupButton from './SignupButton'

const TitleContainer = styled(Link)`
  display: flex;
  align-items: end;
`

const Icon = styled.img`
  display: block;
  width: 100%;
  max-width: 5rem;
  margin: 0.5em 1em;
`
// Need to have title outside link, only icon will be linked
// const Title = styled.h1`
//   color: black;
//   text-decoration: none;
// `

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--light-blue);
  border-bottom: 2px solid var(--button-blue);
`

const SignupDiv = styled.div`
  padding: 0 1em;
`

export default function Header () {
  const user = useSelector(state => state.user) // user stores user state data

  return (
    <Head>
      <TitleContainer to='/'>
        <Icon src={logo} alt='icon' />
        {/* <Title>Freddit</Title> */}
      </TitleContainer>

      {user.id ? (
        ''
      ) : (
        <SignupDiv>
          {/* Signup OR Signout */}
          <p>
            Want to join all the REAL front pagers at Freddit? Sign up today!
          </p>
          <SignupButton />
        </SignupDiv>
      )}
    </Head>
  )
}
