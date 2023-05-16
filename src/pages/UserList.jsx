import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import axios from 'axios'

function UserList() {
  useEffect(() => {
    getUsersList()
  }, [])

  const getUsersList = async () => {
    try {
      const accessToken = localStorage.getItem('ACCESS_KEY')

      const response = await axios.get('http://13.125.6.183:8080/users/user-info', {
        headers: {
          ACCESS_KEY: accessToken
        },
      })

      console.log('성공시 받은 데이터 :', response.data)
    } catch (error) {
      console.error('실패시 에러 :', error)
    }
  }

  console.log('getUsersList : ', getUsersList)

  return (
    <>
      <Header />
      <UserListContainer>
        <UserInfoContainer>
          <ProfilePicture>사진</ProfilePicture>
          <Name>이름</Name>
        </UserInfoContainer>
        <div>생일 친구 보여주기</div>
        <div>친구 리스트 보여주기</div>
      </UserListContainer>
    </>
  )
}

export default UserList

const UserListContainer = styled.div`
  padding: 20px;
`

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 40%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`

const Name = styled.div`
  margin-left: 10px;
`
