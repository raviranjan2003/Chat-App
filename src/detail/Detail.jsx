import React from 'react'
import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Ravi Ranjan</h2>
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
          <button>Block</button>
          <button className='logout'>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default Detail