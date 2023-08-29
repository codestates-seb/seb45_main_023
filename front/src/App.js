import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteConst } from './interface/RouteConst';
import Main from './pages/mainpage/Main';
import MyPage from './pages/mypage/MyPage';
import MyBookmark from './pages/mypage/MyBookmark';
import MyLog from './pages/mypage/MyLog';
import MyMission from './pages/mypage/MyMission';
import MyStamp from './pages/mypage/MyStamp';
import Jeju from './pages/blog/Jeju';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteConst.main} element={<Main />} />
        <Route path={RouteConst.mypage} element={<MyPage />} />
        <Route path={RouteConst.mybookmark} element={<MyBookmark />} />
        <Route path={RouteConst.mylog} element={<MyLog />} />
        <Route path={RouteConst.mymission} element={<MyMission />} />
        <Route path={RouteConst.mystamp} element={<MyStamp />} />
        <Route path={RouteConst.jeju} element={<Jeju />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
