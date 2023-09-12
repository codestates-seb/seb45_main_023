import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteConst } from './interface/RouteConst';
import Main from './pages/mainpage/Main';
import MyPage from './pages/mypage/MyPage';
import MyBookmark from './pages/mypage/MyBookmark';
import MyBlog from './pages/mypage/MyBlog';
import MyMission from './pages/mypage/MyMission';
import MyStamp from './pages/mypage/MyStamp';
import LogIn from './pages/loginpage/LogIn';
import SignUp from './pages/signuppage/SignUp';
import Bloglist from './pages/blog/blog_list';
import Blogwrite from './pages/blog/blog_write';
import Blogdetail from './pages/blog/blog_detail';
import Blogedit from './pages/blog/blog_edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteConst.main} element={<Main />} />
        <Route path={RouteConst.mypage} element={<MyPage />} />
        <Route path={RouteConst.mybookmark} element={<MyBookmark />} />
        <Route path={RouteConst.myblog} element={<MyBlog />} />
        <Route path={RouteConst.mymission} element={<MyMission />} />
        <Route path={RouteConst.mystamp} element={<MyStamp />} />
        <Route path={RouteConst.login} element={<LogIn />} />
        <Route path={RouteConst.signup} element={<SignUp />} />
        <Route path={RouteConst.blog_list} element={<Bloglist />} />
        <Route path={RouteConst.blog_write} element={<Blogwrite />} />
        <Route path={RouteConst.blog_detail} element={<Blogdetail />} />
        <Route path={RouteConst.blog_edit} element={<Blogedit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
