import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)
  async function login(e){
    e.preventDefault()
    const response = await fetch("https://mycarblogbackend02072023.onrender.com/login",{
      method:"POST",
      body: JSON.stringify({username,password}),
      headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"*"},
      // credentials:'include'
    })
    if(response.ok){
      console.log("cookies send"+response.cookie("token"))
      window.Cookies.set('token',response.cookie('token'))
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
      
    } else{
      alert('Wrong credentials')
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <form className='login' onSubmit={login}>
        <input type="text" placeholder='username' value={username}
        onChange={(e) => setUserName(e.target.value)}></input>
        <input type="password" placeholder='password' value={password}
        onChange={(e) => setPassword(e.target.value)}></input>
        <button>Login</button>
    </form>
  )
}