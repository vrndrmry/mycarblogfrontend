import React, { useContext, useEffect, useState } from 'react'
import Post from '../Post'
import { UserContext } from '../UserContext';

export default function IndexPage() {
  const [posts, setPost] = useState([])
  const { userInfo } = useContext(UserContext);
  // console.log(userInfo)
  useEffect(()=>{
    fetch(`https://mycarblogbackend02072023.onrender.com/post`).then(res => {
      res.json().then(posts=>{
        console.log(posts)
        setPost(posts)
      })
    })
  },[])
  return (
    <div >
        {posts.length > 0 && posts.map((post,index) => (
          <Post  key={posts[index]._id} {...post} />
        ))}
    </div>
  )
}