import React, { useEffect, useRef, useState } from 'react'
import "./chat.css";
import EmojiPicker from 'emoji-picker-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useChatStore from '../lib/chatStore';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();

  const { chatId } = useChatStore();

  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({ behavior : "smooth" });
  },[])

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chatId),(res) => {
      setChat(res.data());
    })

    return () =>{
      unSub();
    }
  }, [chatId]);

  const handleEmoji = (e) => {
    // console.log(e.emoji);
    setText((prev => prev + e.emoji));
  }
  return (
    <div className="chat">
      <div className='top'>
        <div className='user'>
          <img src='./avatar.png' alt='img' />
          <div className='texts'>
            <span>Ravi Ranjan</span>
            <p>Lorem ipsum dolor sit amet consectetur </p>
          </div>
        </div>
        <div className='icons'>
          <img src="./phone.png" alt="img" />
          <img src="./video.png" alt="img" />
          <img src="./info.png" alt="img" />
        </div>
      </div>
      <div className='center'>
        {chat?.messages?.map((message)=>(
          <div className="message own" key={message.createdAt}>
          <img src="./avatar.png" alt="img" />
          <div className="texts">
            {message.img && 
              <img src={message.img} alt="img" />
            }
            <p>
              {message.text}
            </p>
            {/* <span>1 min ago</span> */}
          </div>
        </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className='bottom'>
        <div className='icons'>
          <img src="./img.png" alt="img" />
          <img src="./camera.png" alt="img" />
          <img src="./mic.png" alt="img" />
        </div>
        <input 
          type="text" 
          placeholder='Type a message...'
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className='emoji'>
          <img 
            src="./emoji.png" 
            alt="img" 
            onClick={()=>setOpen((prev => !prev))}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat