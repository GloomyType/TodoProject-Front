import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { login } from '../Redux/Action/authAction'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signupPage = () => {
    navigate(`/signup`)
  }

  const handleLogin =async (e) => {
    e.preventDefault()
    const result = await dispatch(login({ email, password }))
    if (result.success) {
      window.location.reload()
    }else {
      alert("이메일이나 비밀번호가 올바르지 않습니다.")
    }
  }

  return (
    <WrapperDiv>
      <LoginForm>
      <form>
        <InputLabel>Email</InputLabel>
        <InputField
          type="text"
          placeholder="Enter your email"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputLabel>Password</InputLabel>
        <InputField
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton onClick={(e) => handleLogin(e)}>Login</SubmitButton>
      </form>
        <SignUpButton onClick={() => signupPage()}>Sign Up</SignUpButton>
      </LoginForm>
    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Changed to center */
  width: 100%;
  height: 60%;
`

const LoginForm = styled.div`
  width: 400px; /* Increased width */
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px; /* Added margin to push the form to the top */
`

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`

const InputField = styled.input`
  width: 94%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`

export default LoginPage