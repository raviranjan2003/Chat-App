import React, { useState } from 'react'
import "./chat.css";
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

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
        <div className="message">
          <img src="./avatar.png" alt="img" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing 
              elit. Aut exercitationem dicta sint eum ullam 
              iure est voluptate debitis. Dolorum impedit harum 
              sed dicta repellendus debitis facilis tempora beatae 
              eum nihil!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src="./avatar.png" alt="img" />
          <div className="texts">
            <img src="./avatar.png" alt="img" />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing 
              elit. Aut exercitationem dicta sint eum ullam 
              iure est voluptate debitis. Dolorum impedit harum 
              sed dicta repellendus debitis facilis tempora beatae 
              eum nihil!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="img" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing 
              elit. Aut exercitationem dicta sint eum ullam 
              iure est voluptate debitis. Dolorum impedit harum 
              sed dicta repellendus debitis facilis tempora beatae 
              eum nihil!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src="./avatar.png" alt="img" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing 
              elit. Aut exercitationem dicta sint eum ullam 
              iure est voluptate debitis. Dolorum impedit harum 
              sed dicta repellendus debitis facilis tempora beatae 
              eum nihil!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
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