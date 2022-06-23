import React, {useState} from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function GoogleSignIn() {
    const [user,setUser] = useState({})

    const createPopup= async()=>{
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    setUser(result.user);
  }
  
    return (
      <div className="App">
  
        <nav>{user.uid?user.displayName:"Anonymous User"}</nav>
  
        {user.uid?
        <button onClick={()=>{setUser({})}}>Logout</button>
        :
        <button onClick={()=>{createPopup()}}>Sign in with Google</button>
        }
      </div>
    );
  }