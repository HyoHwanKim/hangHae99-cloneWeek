import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import axios from '../utils/axios'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'


function UserList() {
  const [userList, setUserList] = useState([])
  const [myProfile, setMyProfile] = useState()
  const [chatRooms, setChatRooms] = useState([])
  const [addRoom, setAddRoom] = useState(false) //방생성 모달
  const [showModal, setShowModal] = useState(false) //프로필 모달
  const [roomName, setRoomName] = useState('')
  const [birthday, setBirthday] = useState([])
  const [detailProfile, setDetailProfile] = useState([])

  const navigate = useNavigate()

  const openModal = () => {
    setAddRoom(true)
  }

  const closeModal = () => {
    setAddRoom(false)
  }

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value)
  }

  const handleAddRoom = () => {

    addChatRoom()
    closeModal()
  }

  useEffect(() => {
    getMyProfile()
    getUsersList()
    getChatRoomList()
    happyBirthday()
  }, [])

  //내 정보 조회
  const getMyProfile = async () => {
    const response = await axios.get('/users/mypage')
    setMyProfile(response.data)
  }

  // 생일 미리 보기
  const happyBirthday = async () => {
    const response = await axios.get('/users/mypage/birthday')
    setBirthday(response.data)
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
  // console.log('chatRooms : ', chatRooms)

  // 방생성 
  const addChatRoom = async () => {
    const ACCESS_KEY = localStorage.getItem('ACCESS_KEY');
    try {
      const response = await axios.post('/chat',
        {
          roomName: roomName,
        },
        {
          headers: {
            ACCESS_KEY: `bearer ${ACCESS_KEY}`,
          },
        }
      )

      setRoomName(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const userDetail = (userId) => {
    getUserDetailModal(userId)
    setShowModal(true)
    // console.log('userId : ', userId)
  }

  const getUserDetailModal = async (userId) => {
    const response = await axios.get(`/users/user-info/${userId}`)
    setDetailProfile(response.data)
    // console.log('getUserDetailModal : ', detailProfile)
  }

  const entryChatRoom = (roomId) => {
    getEntryChatRoom(roomId)
    // console.log('입장')
  }

  const getEntryChatRoom = async (roomId) => {
    const response = await axios.get(`/chat/${roomId}`)
    // console.log('response : ', response.data)
    navigate(`/ChatRoom/${roomId}`)

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

        <BirthdayContainer>
          <div>
            <h4>생일인<br /> 친구</h4>
          </div>
          {birthday.map((HBD) => (
            <div key={HBD.userid}>
              <BirthdayImage src={HBD.image_url} alt="프로필 사진" />
              <div>{HBD.username}</div>
            </div>
          ))}
        </BirthdayContainer>

        <ShowListContainer>
          <ShowContainerSecthon>
            {userList.map((user) => (
              <ShowUserList key={user.userid} onClick={() => userDetail(user.userid)}>
                <UserImage src={user.image_url} alt="프로필 사진" />
                <Name>{user.username}</Name>
              </ShowUserList>
            ))}
          </ShowContainerSecthon>

          <ShowContainerSecthon>
            <Button variant="outlined" onClick={openModal}
              sx={{
                marginBottom: '20px',
                width: '422px',
                padding: '10px'
              }}>방생성</Button>
            {chatRooms.map((room) => (
              <ShowChatRooms key={room.roomId} onClick={() => entryChatRoom(room.roomId)}>
                {room.roomName}
              </ShowChatRooms>
            ))}
          </ShowContainerSecthon>

          <ReactModal
            isOpen={addRoom}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
              content: {
                width: '50%',
                height: '50%',
                margin: 'auto',
                borderRadius: '8px'
              },
              overlay: {
              },
            }}
          >

            <TextField id="outlined-basic" label="방이름" variant="outlined"
              onChange={handleRoomNameChange}
              value={roomName} />
            <Button variant="outlined" onClick={handleAddRoom}
              sx={{
                marginLeft: '160px',
              }}>방생성</Button>
          </ReactModal>


          <ReactModal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            style={{
              content: {
                width: '500px',
                height: '50%',
                margin: 'auto',
                borderRadius: '8px',
              },
              overlay: {},
            }}
          >
            <BirthdayImage src={detailProfile.image_url} alt="프로필 사진" />
            <div>{detailProfile.username}</div>
            <div>{detailProfile.birthday}</div>
          </ReactModal>

        </ShowListContainer>

      </UserListContainer >
    </>
  )
}

export default UserList

const ShowContainerSecthon = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: 1px solid black;
  padding: 20px;
`
const ShowListContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 5%;
`
const ShowChatRooms = styled.div`
  border: 1px solid black;
  width: 400px;
  height: 25px;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
  padding: 10px;

  &:hover {
    background-color: lightgray; 
  }
`
const BirthdayContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
`

const BirthdayImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 40%;  
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
  /* border: 1px solid black; */
  border-radius: 8px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: lightgray; 
  }
`

const UserListContainer = styled.div`
  padding: 20px;
`
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
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
