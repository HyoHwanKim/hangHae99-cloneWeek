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
  console.log(file);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/chat/image`,
      file,
      { headers: { ACCESS_KEY: `${token}` } }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

// 마이페이지 get api, method : get, end-point : /users/mypage
const receiveMyPageInfo = async ({ token }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/mypage`,
      { headers: { ACCESS_KEY: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

// 마이페이지 put api, method : put, end-point : /users/mypage
const editMyPageInfo = async ({ token, userInfo }) => {
  try {
    const { profile_image, ...userInfoWithoutImage } = userInfo;
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/users/mypage`,
      userInfoWithoutImage,
      { headers: { ACCESS_KEY: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

export {
  receiveChatRoomInfo,
  submitPicture,
  receiveMyPageInfo,
  editMyPageInfo,
};
