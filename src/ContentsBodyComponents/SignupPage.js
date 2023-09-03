import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { signup } from '../Redux/Action/authAction'
import { useDispatch } from 'react-redux'

const SignUpPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const mainPage = () => {
    navigate(`/`)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    const result = await dispatch(signup({ email, password, nickname }))
    if (result.success) {
      alert("회원가입이 완료되었습니다.")
      navigate('/');
    }else {
      alert("유효하지 않은 정보입니다.")
    }
  }

  return (
    <WrapperDiv>
      <SignUpForm>
      <form>
      <InputLabel>Email</InputLabel>
        <InputField
          type="text"
          placeholder="ex) abc@naver.com"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputLabel>Nickname</InputLabel>
        <InputField
          type="nickname"
          placeholder="Enter your nickname"
          autoComplete="on"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <InputLabel>Password</InputLabel>
        <InputField
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonContainer>
          <SubmitButton onClick={(e) => handleSignup(e)}>Sign Up</SubmitButton>
          <CancelButton onClick={() => mainPage()}>Cancel</CancelButton>
        </ButtonContainer>
      </form>
      </SignUpForm>
    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
`

const SignUpForm = styled.div`
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SubmitButton = styled.button`
  flex: 1;
  padding: 10px;
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

const CancelButton = styled.button`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`

export default SignUpPage