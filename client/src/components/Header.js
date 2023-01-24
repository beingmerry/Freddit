import React from 'react'
import styled from 'styled-components'
import { Button } from '../styled-components/Button'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useState } from 'react'

import LoginModal from './LoginModal'

const Icon = styled.img`
  display: block;
  width: 100%;
  max-width: 5rem;
  margin: 0 1em;
`

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

export default function Header ({ user, setUser }) {
  const [showLoginModal, setShowLoginModal] = useState(false)

  // useEffect for setUser will pass into login modal
  return (
    <Head>
      <Link to='/'>
        <Icon
          src='https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq'
          alt='icon'
        />
      </Link>
      <SignupDiv>
        {/* Signup */}
        <p>Want to join all the swell chaps at Freddit? Sign up today!</p>
        <Button onClick={() => setShowLoginModal(true)}>
          Become a Fredditor
        </Button>
      </SignupDiv>
      {showLoginModal &&
        createPortal(
          <LoginModal onClose={() => setShowLoginModal(false)} />,
          document.body
        )}
    </Head>
  )
}
