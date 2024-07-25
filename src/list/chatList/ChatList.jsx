import React, { useState } from 'react';
import "./chatList.css";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src='/search.png' alt='img'/>
          <input type="text" placeholder='Search'/>
        </div>
        <img 
          src={addMode ? "./minus.png" : "./plus.png"} 
          alt="img" 
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      <div className='item'>
        <img src="./avatar.png" alt="" />
        <div className='texts'>
          <span> Ravi Ranjan</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src="./avatar.png" alt="" />
        <div className='texts'>
          <span> Ravi Ranjan</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src="./avatar.png" alt="" />
        <div className='texts'>
          <span> Ravi Ranjan</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src="./avatar.png" alt="" />
        <div className='texts'>
          <span> Ravi Ranjan</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src="./avatar.png" alt="" />
        <div className='texts'>
          <span> Ravi Ranjan</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default ChatList;