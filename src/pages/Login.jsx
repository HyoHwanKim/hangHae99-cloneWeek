import { Button, TextField, colors } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import axios from 'axios'

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
      const response = await axios.post('http://13.125.6.183:8080/login', loginData)
      console.log('데이터 : ', response.data)

    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value })
  }



  return (
    <Container>
      <LoginForm>
        <h1>Title</h1>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FEE500;
`

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  width: 100%;
`

const TextFidelContainer = styled.div`
  margin: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`
