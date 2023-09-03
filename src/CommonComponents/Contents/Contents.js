import React from 'react'
import styled from 'styled-components'
import ContentsBodyLayout from '../Layout/Contents/ContentsBodyLayout'

const Contents = ( {children})  => {
  return (
    <ContentsWrapper>
      <ContentsBodyLayout>
        {children}
      </ContentsBodyLayout>
    </ContentsWrapper>
  )
}

const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 85%;
    left: 0px;
    top: 15%;
    background: #FFFFFF;
`
export default Contents