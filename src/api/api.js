import axios from "axios";

// 채팅방 입장시 api, method : post, end-point : /enter
const receiveChatRoomInfo = async ({ token, roomId }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/chat/${roomId}`,
      { headers: { ACCESS_KEY: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

// 채팅방 사진 전송 api, method : post, end-point : chat/image
const submitPicture = async ({ token, file }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/chat/image`,
      { image: file },
      { headers: { ACCESS_KEY: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

export { receiveChatRoomInfo, submitPicture };
