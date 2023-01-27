import React from 'react'
import styled from 'styled-components'

const Phantom = styled.div`
  display: block;
  height: 60px;
  width: 100%;
`

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--light-blue);
  border-top: 2px solid var(--button-blue);
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  height: fit-content;
  width: 100%;
`

const Acknowledgements = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

export default function Footer () {
  return (
    <>
      <Phantom />
      <FooterContainer>
        <Acknowledgements>
          <p>🏗️ Built by Scott Meadows, Rimon Moomey, and Ben Merryman</p>
          <p>⚠️ Student Project for Phase 4 of Flatiron Coding School</p>
          <p>🚫 THIS IS NOT THE REAL REDDIT</p>
        </Acknowledgements>
      </FooterContainer>
    </>
  )
}
