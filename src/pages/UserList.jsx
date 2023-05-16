import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import axios from '../utils/axios'

function UserList() {
  const [userList, setUserList] = useState([])
  const [myProfile, setMyProfile] = useState()
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    getMyProfile()
    getUsersList()
    getChatRoomList()
  }, [])

  //내 정보 조회
  const getMyProfile = async () => {
    const response = await axios.get('/users/mypage')
    setMyProfile(response.data)
  }

  // 유저목록 조회
  const getUsersList = async () => {
    try {
      const response = await axios.get('/users/user-info')
      setUserList(response.data);
    } catch (error) {
      console.error('실패시 에러:', error)
    }
  }

  // 체팅방리스트 조회
  const getChatRoomList = async () => {
    const response = await axios.get('/room')
    setChatRooms(response.data)
  }



  return (
    <>
      <Header />
      <UserListContainer>

        <UserInfoContainer>
          {myProfile && (
            <>
              <UserImage src={myProfile.image_url} alt="프로필 사진" />
              <Name>{myProfile.username}</Name>
            </>
          )}
        </UserInfoContainer>


        <div>생일 친구 보여주기</div>

        <ShowListContainer>
          <Test>
            {userList.map((user) => (
              <ShowUserList key={user.userid}>
                <UserImage src={user.image_url} alt="프로필 사진" />
                <Name>{user.username}</Name>
              </ShowUserList>
            ))}
          </Test>

          <Test>
            {chatRooms.map((room) => (
              <ShowChatRooms key={room.roomId}>
                {room.roomName}
              </ShowChatRooms>
            ))}
          </Test>
        </ShowListContainer>

      </UserListContainer>
    </>
  )
}

export default UserList

const Test = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const ShowListContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  display: flex;
  gap: 5%;
`
const ShowChatRooms = styled.div`
  border: 1px solid black;
  width: 100%;
  margin-bottom: 20px;

`
const UserImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 40%;
`
const ShowUserList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid black;
  width: 100%;
`
const UserListContainer = styled.div`
  padding: 20px;
`
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
`
const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 40%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Name = styled.div`
  margin-left: 10px;
  
`
