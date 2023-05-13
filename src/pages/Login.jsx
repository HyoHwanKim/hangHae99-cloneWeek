import { Button, TextField, colors } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled, css } from 'styled-components'


function Login() {

  const navigate = useNavigate()

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <Container>
      <LoginForm>
        <h1>Title</h1>
        <TextFidelContainer>
          <TextField id="outlined-basic" label="아이디" variant="outlined"
            sx={{
              width: '300px',
              backgroundColor: 'white'
            }}
          />
        </TextFidelContainer>
        <TextFidelContainer>
          <TextField id="outlined-basic" label="비밀번호" variant="outlined" type='password'
            sx={{
              width: '300px',
              backgroundColor: 'white'
            }}
          />
        </TextFidelContainer>
        <ButtonContainer>
          <Button variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: colors.brown[800],
                color: 'white'
              }
            }}
          >로그인</Button>
          <Button variant="contained" onClick={handleSignup}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: colors.brown[800],
                color: 'white'
              }
            }}
          >회원가입</Button>
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
