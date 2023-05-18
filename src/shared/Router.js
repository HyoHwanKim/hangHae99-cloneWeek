import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ChatRoom from "../pages/ChatRoom";
import UserList from "../pages/UserList";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/ChatRoom/:id' element={<ChatRoom />} />
          <Route path='/userslist' element={<UserList />} />
          <Route path='/MyPage/:id' element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
