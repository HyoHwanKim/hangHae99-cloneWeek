import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ChatRoom from "../pages/ChatRoom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/ChatRoom' element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
