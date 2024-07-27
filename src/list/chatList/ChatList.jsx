import React, { useEffect, useState } from 'react';
import "./chatList.css";
import Adduser from './adduser/Adduser';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useUserStore from '../../lib/store';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      // setChats(doc.data());
      const items = res.data().chats;

      const promises = items.map( async(item) => {
        const userDocRef = doc(db, "users", item.recieverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return [...item, user];
      })

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
    });
    
    return () => {
      unSub();
    }
  },[currentUser.id]);
  // console.log(chats);
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
      {
        chats.map(chat => {
      <div className='item'>
        <img src="./avatar.png" alt="" />
        <div className='texts'>
          <span> Ravi Ranjan</span>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
        })
      }
      {addMode && <Adduser/>}
    </div>
  )
}

export default ChatList;