import React from 'react'
import styled from 'styled-components'

const ContentsBodyLayout = ({children}) => {
  return <ContentsBodyDiv>{children}</ContentsBodyDiv>
}

const ContentsBodyDiv = styled.div`
    width: 100%;
    height: 100%;
`
export default ContentsBodyLayout