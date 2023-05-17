import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ChatRoom from "../pages/ChatRoom";
import UserList from "../pages/UserList";
import Header from "../components/Header";

const Router = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/ChatRoom/:id' element={<ChatRoom />} />
          <Route path='/userslist' element={<UserList />} />
          {/* <Route path='/test' element={<Header />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
