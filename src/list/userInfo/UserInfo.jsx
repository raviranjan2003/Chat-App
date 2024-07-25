import React from 'react';
import "./userInfo.css";

const UserInfo = () => {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src='./avatar.png' alt='img'></img>
        <h1>Ravii</h1>
      </div>
      <div className='icons'>
        <img src='./more.png' alt='img'></img>
        <img src='./video.png' alt='img'></img>
        <img src='./edit.png' alt='img'></img>
      </div>
    </div>
  )
}

export default UserInfo;