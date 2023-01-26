import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { login } from '../features/user/userSlice'
import { FormInput } from '../styled-components/FormInput'

import { hideLoginModal } from '../features/loginModal/loginModalSlice'

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  margin: 0.75em;
`

export default function LoginForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()

  function errorMap (errors) {
    return (
      <ul style={{ color: 'red' }}>
        {errors.map(error => (
          <li>{error}</li>
        ))}
      </ul>
    )
  }

  function handleNewUser (e) {
    e.preventDefault()
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        email
      })
    }).then(r => {
      if (r.ok) {
        r.json().then(data => {
          dispatch(login(data))
          dispatch(hideLoginModal())
        })
      } else {
        r.json().then(data => {
          setErrors(data.errors)
        })
      }
    })
  }

  return (
    <LoginContainer onSubmit={e => handleNewUser(e)}>
      <h1>Signup for Freddit</h1>
      <label htmlFor='username'>Username</label>
      <FormInput
        placeholder='fredditor_#1'
        type='text'
        id='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <FormInput
        placeholder='Sup3rS3cretP@ss'
        type='password'
        id='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor='password_confirmation'>Confirm Password</label>
      <FormInput
        placeholder='Sup3rS3cretP@ss'
        type='password'
        id='password_confirmation'
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
      />
      <label htmlFor='email'>Email</label>
      <FormInput
        placeholder='email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.length === 0 ? null : errorMap(errors)}
      <FormInput type='submit' value='Login' />
    </LoginContainer>
  )
}
