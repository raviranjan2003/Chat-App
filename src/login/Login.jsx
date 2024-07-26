import React, { useState } from 'react';
import "./login.css";
import { toast } from 'react-toastify';
import { auth, db } from "../lib/firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../lib/upload.js';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    })
    const [loading, setLoading] = useState(false);

    const handleAvatar = (e) => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleLogin = (e) => {
        e.preventDefault();
        // toast.warn("Hello");
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            // creating user
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);
            
            // setting user's data to database
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                avatar : imgUrl,
                id : response.user.uid,
                blocked: []
            });

            // setting user's chat related data
            await setDoc(doc(db, "userchats", response.user.uid), {
                chat: []
            });

            toast.success("Account created!");
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder='Email' name='email'/>
                <input type="password" placeholder='Password' name='password'/>
                <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
        <h2>Create User</h2>
            <form onSubmit={handleSignUp}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="img" />
                    Upload an image</label>
                <input type="file" id='file' style={{display: "none"}} onChange={handleAvatar}/>
                <input type="text" placeholder='Username' name='username' />
                <input type="email" placeholder='Email' name='email' />
                <input type="password" placeholder='Password' name='password' />
                <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login;