import { Button, TextField, colors } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'
import logo from '../img/logo.png'

function Login() {
  const [loginForm, setLoginForm] = useState({
    userid: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleLogin = async () => {
    try {
      // 서버로 보낼 데이터
      const loginData = {
        userid: loginForm.userid,
        password: loginForm.password
      }

      // 서버로 데이터 전송
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, loginData)
      console.log('데이터 : ', response.data)

      const Access_key = response.headers.get('Access_key')
      const Refresh_key = response.headers.get('Refresh_key')
      localStorage.setItem('ACCESS_KEY', Access_key)
      localStorage.setItem('REFRESH_KEY', Refresh_key)

      navigate('/userslist')

    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setLoginForm({ ...loginForm, [name]: value })
  }



  return (
    <Container>
      <LoginForm>
        <Logo src={logo} alt="로고" />
        <TextFidelContainer>
          <TextField
            id="userid"
            name="userid"
            label="아이디"
            variant="outlined"
            value={loginForm.userid}
            onChange={handleFormChange}
            sx={{
              width: '300px',
              backgroundColor: 'white'
            }}
          />
        </TextFidelContainer>
        <TextFidelContainer>
          <TextField
            id="password"
            name="password"
            label="비밀번호"
            variant="outlined"
            type="password"
            value={loginForm.password}
            onChange={handleFormChange}
            sx={{
              width: '300px',
              backgroundColor: 'white'
            }}
          />
        </TextFidelContainer>
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              width: '140px',
              marginTop: '10px',
              '&:hover': {
                backgroundColor: colors.brown[800],
                color: 'white'
              }
            }}
          >
            로그인
          </Button>
          <Button
            variant="contained"
            onClick={handleSignup}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              width: '140px',
              marginTop: '10px',
              '&:hover': {
                backgroundColor: colors.brown[800],
                color: 'white'
              }
            }}
          >
            회원가입
          </Button>
        </ButtonContainer>
      </LoginForm>
    </Container>
  )
}

export default Login


const Logo = styled.img`
  width: 250px;
  height: 250px;
`


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFFFFF;
  `

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  background-color: #FEE500;
  padding: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  height: 600px;

`

const TextFidelContainer = styled.div`
  margin: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`
