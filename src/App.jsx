import { useEffect, useState } from "react";
import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import List from "./list/List"
import Login from "./login/Login";
import Notification from "./notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import useUserStore from "./lib/store";
import useChatStore from "./lib/chatStore";

const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, user =>{
      fetchUserInfo(user?.uid);
    })

    return () => {
      unSub();
    }
  }, [fetchUserInfo]);


  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {currentUser ? 
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </> :
        <Login />
      }
      <Notification />
    </div>
  )
}

export default App