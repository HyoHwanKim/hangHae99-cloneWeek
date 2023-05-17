import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


function Header() {

  const logOut = async () => {

    const REFRESH_KEY = localStorage.getItem('REFRESH_KEY')
    const ACCESS_KEY = localStorage.getItem('ACCESS_KEY')

    const response = await axios.post('http://13.125.6.183:8080/users/logout',
      {
        headers: {
          ACCESS_KEY: ACCESS_KEY,
        }
      }
    )
  }

  const logOutHeandler = () => {
    logOut()
    // window.localStorage.removeItem('REFRESH_KEY')
    // window.localStorage.removeItem('ACCESS_KEY')
    console.log('로그아웃')
  }

  return (
    <HeaderContainer>
      <Left></Left>
      <Center>로고</Center>
      <Right onClick={logOutHeandler}>LogOut</Right>
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
