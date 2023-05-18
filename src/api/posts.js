import axios from 'axios'

const usersList = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/user-info`)
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users')
  }
}

export { usersList }
