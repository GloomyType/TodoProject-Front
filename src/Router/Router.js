import React from 'react'
import styled from 'styled-components'
import Header from '../CommonComponents/Header/Header'
import Contents from '../CommonComponents/Contents/Contents'
import LoginPage from '../ContentsBodyComponents/LoginPage'
import SignupPage from '../ContentsBodyComponents/SignupPage'
import TodoListPage from '../ContentsBodyComponents/TodoListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
    const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <ContainerWrapper>
        <Header></Header>
        <Contents>
          <Routes>
            {token ? <Route path="/" element={<TodoListPage />}></Route> : <Route path="/" element={<LoginPage />}></Route> }
            <Route path="/signup" element={<SignupPage />}></Route>
          </Routes>
        </Contents>
      </ContainerWrapper>
    </BrowserRouter>
  )
}

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #FFFFFF;
`

export default Router