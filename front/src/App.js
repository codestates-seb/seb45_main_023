import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteConst } from './interface/RouteConst';
// import GetData from './components/GetData';

import Main from './pages/mainpage/Main';
import MyPage from './pages/mypage/MyPage';
import MyBookmark from './pages/mypage/MyBookmark';
import MyBlog from './pages/mypage/MyBlog';
import MyMission from './pages/mypage/MyMission';
import MyStamp from './pages/mypage/MyStamp';

import Bloglist from './pages/blog/blog_list';
import Blogwrite from './pages/blog/blog_write';
import Blogdetail from './pages/blog/blog_detail';

import LogInPage from './pages/loginpage/LogIn';
import SignUpPage from './pages/signuppage/SignUp';
import MyTokens from './pages/oauthpage/oauth-token';
import WelcomePage from './pages/welcomepage/Welcome';
import FindEmail from './pages/findpage/findEmailPages/findEmail';
import FindEmailMethod1 from './pages/findpage/findEmailPages/findEmailMethod1';
import FindEmailMethod2 from './pages/findpage/findEmailPages/findEmailMethod2';
import FindPasswordMethod1 from './pages/findpage/findPasswordPages/findPasswordMethod1';
import FindPasswordMethod2 from './pages/findpage/findPasswordPages/findPasswordMethod2';
import FindPassword from './pages/findpage/findPasswordPages/findPassword';

function App() {
  // GetData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteConst.main} element={<Main />} />
        <Route path={RouteConst.mypage} element={<MyPage />} />
        <Route path={RouteConst.mybookmark} element={<MyBookmark />} />
        <Route path={RouteConst.myblog} element={<MyBlog />} />
        <Route path={RouteConst.mymission} element={<MyMission />} />
        <Route path={RouteConst.mystamp} element={<MyStamp />} />

        <Route path={RouteConst.blog_list} element={<Bloglist />} />
        <Route path={RouteConst.blog_write} element={<Blogwrite />} />
        <Route path={RouteConst.blog_detail} element={<Blogdetail />} />

        <Route path={RouteConst.login} element={<LogInPage />} />
        <Route path={RouteConst.signup} element={<SignUpPage />} />
        <Route path={RouteConst.welcome} element={<WelcomePage />} />
        <Route path={RouteConst.findemail} element={<FindEmail />} />
        <Route path={RouteConst.findemailmethod1} element={<FindEmailMethod1 />} />
        <Route path={RouteConst.findemailmethod2} element={<FindEmailMethod2 />} />
        <Route path={RouteConst.findpw} element={<FindPassword />} />
        <Route path={RouteConst.findpwmethod1} element={<FindPasswordMethod1 />} />
        <Route path={RouteConst.findpwmethod2} element={<FindPasswordMethod2 />} />
        <Route path={RouteConst.oauth} element={<MyTokens />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
