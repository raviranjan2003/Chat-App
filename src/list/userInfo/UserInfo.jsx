import React from 'react';
import "./userInfo.css";
import useUserStore from '../../lib/store';

const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || './avatar.png'} alt='img'></img>
        <h1>{currentUser.username}</h1>
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