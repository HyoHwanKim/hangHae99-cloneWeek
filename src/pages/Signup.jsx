import { TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { colors } from '@mui/material'

function Signup() {

  // 이미지 업로드 스코프 시작
  const [imagePreview, setImagePreview] = useState(null)
  const ImageUploadHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    console.log('사진 : ', file)
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }
  // 이미지 업로드 스코프 끝

  const DuplicateCheck = () => {
    //중복검사 로직 들어갈 자리
  }

  return (
    <Container>
      <SignUpForm>

        <FileUploadContainer>
          <ImagePreview src={imagePreview} alt="Preview" />
          <input type="file" accept="image/*" onChange={ImageUploadHandler} />
        </FileUploadContainer>

        <IdContainer>
          <TextField id="standard-basic" label="아이디" variant="standard"
            sx={{
              width: '235px',
              margin: '20px'
            }}
          />
          <Button variant="contained" onClick={DuplicateCheck}
            sx={{
              width: '90px',
              height: '50px'
            }}>중복검사</Button>
        </IdContainer>

        <TextField id="standard-basic" label="이름" variant="standard"
          sx={{
            width: '300px',
            margin: '20px'
          }}
        />
        <TextField id="standard-basic" label="비밀번호" variant="standard" type="password"
          sx={{
            width: '300px',
            margin: '20px'
          }}
        />
        <TextField id="standard-basic" label="비밀번호 확인" variant="standard" type="password"
          sx={{
            width: '300px',
            margin: '20px'
          }}
        />
        <Button variant="contained" onClick={DuplicateCheck}
          sx={{
            width: '300px',
            marginTop: '30px'
          }}>가입하기</Button>

      </SignUpForm>
    </Container >
  )
}

export default Signup


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  width: 100%;
`

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`

const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 10px;
  border-radius: 50%;
  border: 1px solid black;
`

const IdContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`