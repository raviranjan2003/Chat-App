import React from 'react'
import "./detail.css";
import { signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { toast } from 'react-toastify';
import useChatStore from '../lib/chatStore';
import useUserStore from '../lib/store';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = 
    useChatStore();

    const { currentUser } = useUserStore();

  const handleLogOut = () => {
    signOut(auth)
    .then(()=>{
      toast.success("Logged Out !");
    })
    .catch(err => {
      toast.error("Something Went Wrong!");
    })
  }
  const handleBlock = async () => {
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked : isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock();
    } catch (error) {
      
    }
  }
  return (
    <div className="detail">
      <div className="user">
        <img src={ user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consecte.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="img" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="img" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="img" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="img" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="img" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="img" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="img" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="img" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="img" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="img" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="img" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="img" />
                <span>photo_2024.png</span>
              </div>
              <img src="./download.png" alt="img" className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="img" />
          </div>
        </div>
        <div className='btn-container'>
          <button 
          title={isReceiverBlocked ? "Click to Unblock": "Block"}
          onClick={handleBlock}>{
            isCurrentUserBlocked ? 
            "You are Blocked :(" : 
            isReceiverBlocked ? 
            "User Blocked !" : "Block"
          }</button>
          <button 
            className='logout' 
            onClick={handleLogOut}
          >Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default Detail