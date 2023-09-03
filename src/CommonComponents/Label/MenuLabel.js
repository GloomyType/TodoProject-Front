import React from 'react'
import styled from 'styled-components'

const MenuLabel = ({name }) => {
  
  return (
    <Labels>
        {name}
    </Labels>
  )
}

const Labels = styled.label`
    font-family: 'Pretendard';
    font-size: 13px;
    line-height: 36px;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: #5D28F2;
    text-decoration: none;
    color: white;
    cursor: pointer;
`

export default MenuLabel