import React from 'react'
import styled from 'styled-components'


function Header() {
  return (
    <HeaderContainer>
      <Left>ChatRoom</Left>
      <Center>로고</Center>
      <Right>LogOut</Right>
    </HeaderContainer>
  )
}

export default Header


const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 20px;
`

const Left = styled.div`
  margin-left: 10px;
`

const Center = styled.div`
  font-weight: bold;
`

const Right = styled.div`
  margin-right: 10px;
`
