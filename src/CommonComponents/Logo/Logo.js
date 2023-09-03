import React from 'react'
import styled from 'styled-components'
import logos from './Todo.png'

const Logo = () => {
  return <LogoImg src={logos} />
}

const LogoImg = styled.img`
    margin: 0 auto;
    height: 100px;
    flex: none;
    order: 0;
    flex-grow: 0;
`
export default Logo