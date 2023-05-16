import axios from "axios";

//UserList get 비동기함수
const axiosInstanse = axios.create({
  baseURL: 'http://13.125.6.183:8080'
})

axiosInstanse.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('ACCESS_KEY')
  config.headers.ACCESS_KEY = accessToken
  return config
})

export default axiosInstanse