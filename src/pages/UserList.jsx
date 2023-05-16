import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import axios from '../utils/axios'
import ReactModal from 'react-modal'


function UserList() {
  const [userList, setUserList] = useState([])
  const [myProfile, setMyProfile] = useState()
  const [chatRooms, setChatRooms] = useState([])
  const [addRoom, setAddRoom] = useState(false) //방생성 모달
  const [showModal, setShowModal] = useState(false) //프로필 모달
  const [roomName, setRoomName] = useState('')
  const [birthday, setBirthday] = useState([])
  const [detailProfile, setDetailProfile] = useState([])


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

  //생일 미리 보기
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
    console.log('userId : ', userId)
  }

  const getUserDetailModal = async (userId) => {
    const response = await axios.get(`/users/user-info/${userId}`)
    setDetailProfile(response.data)
    console.log('getUserDetailModal : ', detailProfile)
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
          {birthday.map((HBD) => (
            <div key={HBD.userid}>
              <BirthdayImage src={HBD.image_url} alt="프로필 사진" />
              <div>{HBD.username}</div>
            </div>
          ))}
        </BirthdayContainer>

        <ShowListContainer>
          <Test>
            {userList.map((user) => (
              <ShowUserList key={user.userid} onClick={() => userDetail(user.userid)}>
                <UserImage src={user.image_url} alt="프로필 사진" />
                <Name>{user.username}</Name>
              </ShowUserList>
            ))}
          </Test>

          <Test>
            <button onClick={openModal}>방생성</button>
            {chatRooms.map((room) => (
              <ShowChatRooms key={room.roomId}>
                {room.roomName}
              </ShowChatRooms>
            ))}
          </Test>
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
            <input
              type="text"
              placeholder="방 이름"
              onChange={handleRoomNameChange}
              value={roomName}
            />
            <button onClick={handleAddRoom}>방 추가</button>
          </ReactModal>


          <ReactModal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            style={{
              content: {
                width: '50%',
                height: '50%',
                margin: 'auto',
                borderRadius: '8px',
              },
              overlay: {},
            }}
          >
            <BirthdayImage src={detailProfile.image_url} alt="프로필 사진" />
            {/* <img>{detailProfile.image_url}</img> */}
            <div>{detailProfile.username}</div>
            <div>{detailProfile.birthday}</div>
          </ReactModal>

        </ShowListContainer>

      </UserListContainer >
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
  border: 1px solid black;
  width: 100%;
  cursor: pointer;
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
