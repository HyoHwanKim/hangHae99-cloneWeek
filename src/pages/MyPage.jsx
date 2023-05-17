import React from "react";
import { receiveMyPageInfo } from "../api/api";

function MyPage() {
  // 토큰 로컬 스토리지에서 추출
  //   const token = localStorage.getItem("ACCESS_KEY");
  // const { isLoading, isError, data } = useQuery("receiveMyPageInfo", () =>
  //   receiveChatRoomInfo({ token, roomId })
  // );
  // if (isLoading) {
  //   return <p>로딩중입니다!</p>;
  // }
  // if (isError) {
  //   return <p>오류가 발생하였습니다!</p>;
  // }

  return <div>MyPage</div>;
}

export default MyPage;
