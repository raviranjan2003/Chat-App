import React, { useEffect, useState } from 'react';
import "./chatList.css";
import Adduser from './adduser/Adduser';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useUserStore from '../../lib/store';
import useChatStore from '../../lib/chatStore';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      try {
        const items = res.data().chats;
        if(!items) return;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId); // Fixed typo
          const userDocSnap = await getDoc(userDocRef);
          
          if (!userDocSnap.exists()) {
            console.error(`User document for ${item.receiverId} does not exist`);
            return { ...item, user: null };
          }
          
          const user = userDocSnap.data();
          return { ...item, user }; 
        });
    
        const chatData = await Promise.all(promises);
    
        setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
        setAddMode(false);
    
      } catch (error) {
        console.error("Error fetching chat data: ", error);
      }
    });
    
    return () => {
      unSub();
    }
  },[currentUser.id]);

  const handleSelect = async (chat) => {

    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    })
    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats
      })
      // Updating store for selected user
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error)
    }
  }

  // While filetering, we check for the user exists or not
  // coz sometime, user is added as friend but his data is deleted from
  // the database
  const filteredChats = chats.filter(c => c.user?.username.toLowerCase().includes(searchInput.toLowerCase()));
  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src='/search.png' alt='img'/>
          <input type="text" 
            placeholder='Search' 
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
        <img 
          src={addMode ? "./minus.png" : "./plus.png"} 
          alt="img" 
          className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {
        filteredChats.map(chat => (
      <div 
        className='item' 
        key={chat.chatId} 
        onClick={()=>handleSelect(chat)}
        style={{ 
          backgroundColor : chat?.isSeen ? "transparent" : "#5183fe"
        }}
      > 
        <img src={chat.user.blocked.includes(currentUser.id) ? 
          "./avatar.png" :
          chat.user.avatar || "./avatar.png"} 
          alt="" 
        />
        <div className='texts'>
          <span>{chat?.user?.username}</span>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
        ))
      }
      {addMode && <Adduser/>}
    </div>
  )
}

export default ChatList;