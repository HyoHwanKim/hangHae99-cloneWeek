import axios from 'axios'

const usersList = async () => {
  try {
    const response = await axios.get("http://13.125.6.183:8080//users/user-info")
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users')
  }
}

export { usersList }
