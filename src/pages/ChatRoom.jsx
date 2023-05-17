import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { styled } from "styled-components";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { receiveChatRoomInfo } from "../api/api";
import { useQuery } from "react-query";

function ChatRoom() {
  // 스크롤 부분(채팅방 입장시 가장 아래로, 채팅로그가 업데이트 될 때마다 가장 아래로)
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current &&
      (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
  }, []);

  // 입력값 상태관리
  const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [chatRoomInfo, setChatRoomInfo] = useState({});

  // 채팅방에 입장한 본인이 누구인지를 상태관리
  const [whoIAm, setWhoIAm] = useState(null);
  useEffect(() => {
    setWhoIAm(chatRoomInfo.userId);
  }, [chatRoomInfo]);

  // 임시 : 토큰 쿠키에 저장
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5dW1pbiIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNjg0MjUyNTkxLCJpYXQiOjE2ODQyNDg5OTF9.MEE9ECj2MHqxObUnNUzTrNUXxlJtszddyVszIQ2is8Y";
  const tokenInCookie = `test=Bearer ${token}`;
  document.cookie = tokenInCookie;

  // 임시 : 방 아이디
  const roomId = "f0526fda-c75b-4186-951d-4d89ae8e5dbf";

  //방 정보 받아오기
  const { isLoading, isError, data } = useQuery("receiveRoomInfo", () =>
    receiveChatRoomInfo({ token, roomId })
  );

  useEffect(() => {
    data && setChatRoomInfo(data);

    if (data) {
      // 소켓 연결
      const stompClient = new Client({
        webSocketFactory: () =>
          new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-edit`),
        // 접속했을 때
        onConnect: (frame) => {
          setStompClient(stompClient);

          // 구독상태 만들기
          stompClient.subscribe("/sub/chat/room" + roomId, function (message) {
            setMessageList((prev) => [...prev, JSON.parse(message.body)]);
            console.log(messageList);
          });
          stompClient.publish({
            destination: "/pub/chat/enter",
            headers: { ACCESS_KEY: token },
            body: JSON.stringify({
              type: "ENTER",
              sender: data.sender,
              roomId: data.roomId,
              message: "",
            }),
          });
        },
      });
      stompClient.activate();
    }
  }, [data]);

  const sendMsg = () => {
    stompClient !== null &&
      stompClient.publish({
        destination: "/pub/chat/send",
        headers: { ACCESS_KEY: token },
        body: JSON.stringify({
          type: "TALK",
          sender: chatRoomInfo.sender,
          userId: chatRoomInfo.userId,
          roomId: chatRoomInfo.roomId,
          image: chatRoomInfo.image_url,
          message: input,
        }),
      });
  };

  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  // const messageList = [
  //   {
  //     type: "TALK",
  //     sender: "최재홍",
  //     userId: "1",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message:
  //       "작성자가 본인이면 우측정렬, 본인이 아니면 좌측정렬, 작성자가 본인이 아닐 때 작성자가 연속해서 채팅을 쳤다면 프로필 사진은 최초에 한번만 랜더링 그 아래로는 프로필 사진이 보이지 않도록.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "이상언",
  //     userId: "2",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message: "안녕하세요.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "조유민",
  //     userId: "3",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message: "반갑습니다.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "김효환",
  //     userId: "4",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message:
  //       "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세. 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "김효환",
  //     userId: "4",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message:
  //       "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세. 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "김재형",
  //     userId: "5",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message: "어렵습니다 어려워요.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "이현규",
  //     userId: "6",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message:
  //       "That's my Life is 아름다운 갤럭시 Be a writer 장르로는 판타지 내일 내게 열리는 건 big, big 스테이지 So that is who I am",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "최재홍",
  //     userId: "1",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message:
  //       "작성자가 본인이면 우측정렬, 본인이 아니면 좌측정렬, 작성자가 본인이 아닐 때 작성자가 연속해서 채팅을 쳤다면 프로필 사진은 최초에 한번만 랜더링 그 아래로는 프로필 사진이 보이지 않도록.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "이상언",
  //     userId: "2",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message: "안녕하세요.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "조유민",
  //     userId: "6",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message: "반갑습니다.",
  //     img: "../img/profileImage1.png",
  //   },

  //   {
  //     type: "TALK",
  //     sender: "김재형",
  //     userId: "6",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message: "어렵습니다 어려워요.",
  //     img: "../img/profileImage1.png",
  //   },
  //   {
  //     type: "TALK",
  //     sender: "이현규",
  //     userId: "6",
  //     date: "5월15일 11:01",
  //     roomId: "1",
  //     message:
  //       "That's my Life is 아름다운 갤럭시 Be a writer 장르로는 판타지 내일 내게 열리는 건 big, big 스테이지 So that is who I am",
  //     img: "../img/profileImage1.png",
  //   },
  // ];

  return (
    <div>
      <ChatRoomWrapper>
        <ChatLog ref={scrollRef}>
          {messageList.map((item, index) => (
            <IndividualChat
              whoIAm={whoIAm}
              key={index}
              previousId={messageList[index - 1]?.userId}
              commentUserId={item.userId}
              commentUserProfileImgUrl={item.image_url}
              commentDate={item.date}
              commentUserName={item.sender}
              commentContent={item.message}
            />
          ))}
        </ChatLog>
        <ChatInputArea>
          <textarea onChange={(e) => setInput(e.target.value)}></textarea>
          <div className='button-pair'>
            <button className='picture-submit'>사진전송</button>
            <button onClick={sendMsg} className='message-submit'>
              전송
            </button>
          </div>
        </ChatInputArea>
      </ChatRoomWrapper>
    </div>
  );
}

const IndividualChat = ({
  previousId,
  commentUserId,
  commentUserProfileImgUrl,
  commentDate,
  commentUserName,
  commentContent,
  whoIAm,
}) => {
  return (
    <IndividualChatWrapper
      previousId={previousId}
      whoIAm={whoIAm}
      commentUserId={commentUserId}
    >
      <ProfileImage
        previousId={previousId}
        whoIAm={whoIAm}
        commentUserId={commentUserId}
      >
        <div className='img-wrapper'>
          <img src={commentUserProfileImgUrl} />
        </div>
      </ProfileImage>
      <div>
        <p className='chat-name'>{commentUserName}</p>
        <div className='chat-bubble-wrapper'>
          <div className='chat-bubble'>
            <div>{commentContent}</div>
          </div>
          <div className='comment-date'>{commentDate}</div>
        </div>
      </div>
    </IndividualChatWrapper>
  );
};

const IndividualChatWrapper = styled.div`
  display: ${(props) =>
    props.commentUserId == props.whoIAm ? "block" : "flex"};
  ${(props) => props.commentUserId == props.whoIAm && "align-self : flex-end"};
  ${(props) =>
    props.commentUserId == props.whoIAm ? "width : 60%" : "width : 80%"};
  margin: 10px;

  .chat-name {
    display: ${(props) =>
      (props.commentUserId == props.whoIAm ||
        props.previousId == props.commentUserId) &&
      "none"};
    color: rgb(80, 80, 80);
    font-size: 15px;
    margin: 0 10px 0 10px;
  }

  .chat-bubble-wrapper {
    display: flex;
    flex-direction: ${(props) =>
      props.commentUserId == props.whoIAm ? "row-reverse" : "row"};
    ${(props) =>
      props.previousId == props.commentUserId
        ? "margin : 0px 10px 0px 40px"
        : "10px"};

    .chat-bubble {
      background-color: ${(props) =>
        props.commentUserId == props.whoIAm ? "yellow" : "white"};
      padding: 10px;
      margin-left: 10px;
      border-radius: 10px;
    }
  }

  .comment-date {
    align-self: flex-end;
    width: 140px;
    font-size: 13px;
    margin-left: 5px;
    text-align: ${(props) =>
      props.commentUserId == props.whoIAm ? "right" : "left"};
  }
`;

const ProfileImage = styled.div`
  div {
    display: inline-block;
  }

  .img-wrapper {
    display: ${(props) =>
      props.commentUserId == props.whoIAm ||
      props.previousId == props.commentUserId
        ? "none"
        : "block"};
    border-radius: 10px;
    height: 40px;
    width: 40px;
    overflow: hidden;

    img {
      height: 40px;
      width: 40px;
    }
  }
`;

const ChatRoomWrapper = styled.div`
  height: 860px;
  width: 1000px;
`;

const ChatLog = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 70%;
  background-color: rgb(186, 206, 224);
`;

const ChatInputArea = styled.div`
  display: flex;
  height: 20%;

  textarea {
    height: 60%;
    width: 100%;
    border: none;
    padding: 10px;
    font-size: 20px;
  }

  div {
    display: flex;
    justify-content: right;
  }

  .button-pair {
    display: flex;
    flex-direction: column;
    height: 70%;

    button {
      border: none;
      border-radius: 10px;
      height: 50%;
      width: 80px;
      color: white;
      font-weight: bolder;
      cursor: pointer;
    }

    .picture-submit {
      background-color: rgb(47, 79, 79);
    }

    .message-submit {
      background-color: rgb(112, 128, 144);
    }
  }
`;

export default ChatRoom;
