import styled from 'styled-components'
import { useState } from 'react'
import Logo from '../Logo/Todo.png'
import LogoLayout from '../Layout/Logo/LogoLayout'
import { deleteMember } from '../../Redux/Action/authAction'
import { useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    window.location.reload()
  }

  const handleDeleteAccount = async () => {
    const result = await dispatch(deleteMember({ password : password}))
    if (result.success) {
      alert("회원탈퇴가 완료되었습니다.")
      localStorage.removeItem("token")
      localStorage.removeItem("id")
      window.location.reload()
    }else {
      alert("비밀번호가 맞지 않습니다.")
    }
  }

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [password, setPassword] = useState('')

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <HeaderWrapper>
      <LogoLayout>
        <Logo></Logo>
      </LogoLayout>
      {localStorage.getItem("token") && (
        <ButtonGroup>
          <LogoutButton onClick={() => logout()}>로그아웃</LogoutButton>
          <DeleteAccountButton onClick={() => openModal()}>회원탈퇴</DeleteAccountButton>
        </ButtonGroup>
      )}
      {isModalOpen && (
        <PopupOverlay>
        <AddTodoPopup>
          <InputContainer>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '900px',
                height: '50px',
              }}
            />
            <AddTodoButton style={{ width: '910px', height: '50px' }} onClick={handleDeleteAccount}>
              회원 탈퇴
            </AddTodoButton>
          </InputContainer>
          <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
        </AddTodoPopup>
      </PopupOverlay>
      )}
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  height: 15%;
  padding: 0 32px
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`

const LogoutButton = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const DeleteAccountButton = styled.button`
  background-color: #ff3333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AddTodoPopup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 10px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const AddTodoButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`

export default Header