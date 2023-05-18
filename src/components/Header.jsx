import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";

function Header() {
  const navigate = useNavigate();

  const logOut = async () => {
    const REFRESH_KEY = localStorage.getItem("REFRESH_KEY");
    const ACCESS_KEY = localStorage.getItem("ACCESS_KEY");

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/logout`,
      {},
      {
        headers: {
          ACCESS_KEY: ACCESS_KEY,
        },
      }
    );
  };

  const logOutHeandler = () => {
    logOut();
    window.localStorage.removeItem("REFRESH_KEY");
    window.localStorage.removeItem("ACCESS_KEY");
    alert("로그아웃");
    navigate("/");
  };

  const logoClick = () => {
    navigate('/userslist')
  }

  return (
    <HeaderContainer>
      <Left></Left>
      <Center>
        <Logo src={logo} alt="logo" onClick={logoClick} />
      </Center>
      <Right onClick={logOutHeandler}>LogOut</Right>
    </HeaderContainer>
  );
}

export default Header;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fee500;
`;

const Left = styled.div`
  margin-left: 10px;
`;

const Center = styled.div`
  font-weight: bold;
`;

const Right = styled.div`
  margin-right: 50px;
  cursor: pointer;
`;
