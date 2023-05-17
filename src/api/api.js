import axios from "axios";

// 채팅방 입장시 api, method : post, end-point : /enter
const receiveChatRoomInfo = async ({ token, roomId }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/chat/${roomId}`,
      { headers: { ACCESS_KEY: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

export { receiveChatRoomInfo };
