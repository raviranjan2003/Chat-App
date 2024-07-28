import React, { useEffect, useRef, useState } from 'react'
import "./chat.css";
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useChatStore from '../lib/chatStore';
import useUserStore from '../lib/store';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

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

  const handleSend = async () => {
    if(text === "") return ;

    try {
      await updateDoc(doc(db, "chats", chatId),{
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()
        })
      })

      const userIds = [currentUser.id, user.id];
      
      userIds.forEach( async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if(userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex( c => c.chatId === chatId);
          userChatsData.chats[chatIndex].lastMessage = text;

          userChatsData.chats[chatIndex].isSeen = 
            id === currentUser.id ? true : false;
            
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
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
        <button className='sendButton' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat