import axios from "axios"

// 회원가입
const addUsers = async (formData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}users/signup`, formData)
    return response
  } catch (error) {
    console.error("회원가입 API 에러 : ", error)
    throw error
  }
}



export { addUsers }
