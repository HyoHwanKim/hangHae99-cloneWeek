import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "react-query";
import { receiveMyPageInfo } from "../api/api";
import { editMyPageInfo } from "../api/api";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whichModalOpen, setWhichModalOpen] = useState("name");

  const queryClient = useQueryClient();

  //토큰 로컬 스토리지에서 추출
  const token = localStorage.getItem("ACCESS_KEY");
  const { isLoading, isError, data } = useQuery("receiveMyPageInfo", () =>
    receiveMyPageInfo({ token })
  );

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  const editMyPageInfoApi = useMutation(editMyPageInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("receiveMyPageInfo", receiveMyPageInfo);
    },
    onError: () => {
      alert("수정에 실패하였습니다.");
    },
  });

  const nameModal = () => {
    setIsModalOpen(!isModalOpen);
    setWhichModalOpen("name");
  };
  const passwordModal = () => {
    setIsModalOpen(!isModalOpen);
    setWhichModalOpen("password");
  };

  const birthdayModal = () => {
    setIsModalOpen(!isModalOpen);
    setWhichModalOpen("birthday");
  };

  const commentModal = () => {
    setIsModalOpen(!isModalOpen);
    setWhichModalOpen("comment");
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const onSubmitHandler = () => {
    editMyPageInfoApi.mutate({ token, userInfo });
  };

  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  return (
    <div>
      {userInfo && (
        <MyPageWrapper>
          <h1>{data.username}님의 My Page</h1>
          <MyPageForm>
            <div id='profile-image-wrapper'>
              <img src={userInfo?.profile_image}></img>
            </div>
            <div id='many-input'></div>
            <div onClick={() => nameModal()} className='input'>
              이름 : {userInfo.username}
            </div>
            <div onClick={() => passwordModal()} className='input'>
              Password : ****
            </div>
            <div onClick={() => birthdayModal()} className='input'>
              생일 : {userInfo.birthday}
            </div>
            <div onClick={() => commentModal()} className='input'>
              상태메시지 : {userInfo.comment}
            </div>
            <button onClick={onSubmitHandler} id='submit-button'>
              수정하기!
            </button>
          </MyPageForm>
          {isModalOpen && (
            <Transluscent
              onClick={() => modalClose()}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              whichModalOpen={whichModalOpen}
              setWhichModalOpen={setWhichModalOpen}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            ></Transluscent>
          )}
        </MyPageWrapper>
      )}
    </div>
  );
}

const Transluscent = ({
  onClick,
  isModalOpen,
  setIsModalOpen,
  whichModalOpen,
  setWhichModalOpen,
  setUserInfo,
  userInfo,
}) => {
  return (
    <div id='transluscent-wrapper'>
      <TransluscentWrapper onClick={onClick} isModalOpen={isModalOpen}>
        {whichModalOpen === "name" ? (
          <NameModal
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
        ) : whichModalOpen === "password" ? (
          <PasswordModal
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        ) : whichModalOpen === "birthday" ? (
          <BirthdayModal
            placeholder='****-**-**'
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setUserInfo({ ...userInfo, birthday: e.target.value })
            }
          />
        ) : (
          <CommentModal
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setUserInfo({ ...userInfo, comment: e.target.value })
            }
          />
        )}
      </TransluscentWrapper>
    </div>
  );
};

const NameModal = styled.input`
  display: flex;
  align-items: center;
  height: 6%;
  width: 75%;
  padding-left: 10px;
  border-radius: 10px;
  background-color: rgb(245, 245, 220);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  font-weight: 600;
`;

const PasswordModal = styled.input`
  display: flex;
  align-items: center;
  height: 6%;
  width: 75%;
  margin: 0;
  padding-left: 10px;
  border-radius: 10px;
  background-color: rgb(245, 245, 220);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  font-weight: 600;
`;

const BirthdayModal = styled.input`
  display: flex;
  align-items: center;
  height: 6%;
  width: 75%;
  margin: 0;
  padding-left: 10px;
  border-radius: 10px;
  background-color: rgb(245, 245, 220);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  font-weight: 600;
`;

const CommentModal = styled.input`
  display: flex;
  align-items: center;
  height: 6%;
  width: 75%;
  margin: 0;
  padding-left: 10px;
  border-radius: 10px;
  background-color: rgb(245, 245, 220);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  font-weight: 600;
`;

const TransluscentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 15%;
`;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 100vh;

  #transluscent-wrapper {
    display: flex;
    position: fixed;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    height: 70%;
    width: 50%;
    border-radius: 20px;
    margin-top: 86px;
    ${(props) => props.isModalOpen && "pointer-events : all"};
  }
`;

const MyPageForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 70%;
  width: 50%;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #fee500;

  #profile-image-wrapper {
    img {
      height: 150px;
      border-radius: 30px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
      margin: 20px 20px 0 20px;
    }
  }
  .input {
    display: flex;
    align-items: center;
    height: 6%;
    width: 75%;
    margin: 0;
    padding-left: 10px;
    border-radius: 10px;
    background-color: rgb(245, 245, 220);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }

  #submit-button {
    border-radius: 10px;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    padding: 10px;
    background-color: #6f4f28;
    color: white;
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
  }
`;
export default MyPage;
