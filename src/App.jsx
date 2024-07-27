import { useEffect, useState } from "react";
import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import List from "./list/List"
import Login from "./login/Login";
import Notification from "./notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import useUserStore from "./lib/store";

const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, user =>{
      // console.log(user);
      fetchUserInfo(user.uid);
      if(user) {
        setUser(true);
      }
    })

    return () => {
      unSub();
    }
  }, [fetchUserInfo]);

  console.log(currentUser);

  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {currentUser ? 
        <>
          <List></List>
          <Chat></Chat>
          <Detail></Detail>
        </> :
        <Login />
      }
      <Notification />
    </div>
  )
}

export default App