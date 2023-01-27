import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/fr-logo.png'

import SignupButton from './SignupButton'


const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--light-blue);
  border-bottom: 2px solid var(--button-blue);
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const IconLink = styled(Link)`
  display: flex;
  align-items: start;
`

const Icon = styled.img`
  display: block;
  width: 100%;
  max-width: 5rem;
  margin: 0.5em 1em;
`

const Title = styled.h1`
  color: black;
  text-decoration: none;
  @media screen and (max-width: 720px) {
    display: none;
  }
`
const SubTitle = styled.h2`
  color: black;
  text-decoration: none;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`


const SignupDiv = styled.div`
  padding: 0 1em;
`

const SignupBlurb = styled.p`
  @media screen and (max-width: 720px) {
    display: none;
  }
`

export default function Header () {
  const user = useSelector(state => state.user) // user stores user state data

  return (
    <Head>
      <TitleContainer>
        <IconLink to='/'>
          <Icon src={logo} alt='icon' />
        </IconLink>
        <Title>Freddit</Title>
      </TitleContainer>


        <SubTitle>⚠️ This is NOT Reddit ⚠️</SubTitle>
      {user.id ? (
        ''
      ) : (
        <SignupDiv>
          {/* Signup OR Signout */}
          <SignupBlurb>
            Want to join all the REAL front pagers at Freddit? Sign up today!
          </SignupBlurb>
          <SignupButton />
        </SignupDiv>
      )}
    </Head>
  )
}
