import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import "../css/PostList.css";
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

export default function PostList() {


    let {getCollection,deleteDocument}=useFirestore();

      let {user}=useContext(AuthContext);
    if(!user){
        return <p className='loading-text'>Loading User...</p>
    }
    let {error,loading,data:posts}=getCollection('posts',['uid','==',user.uid]);

    if(error){
        return <p className='error-text'>{error}</p>
    }

    let deletePost=async(e,id)=>{
        e.preventDefault();
        await deleteDocument('posts',id);
    }

  return (
    <div className='post-list'>
       <div className='postlist-header'>
         <h2>Explore Posts</h2>
        <p>Discover stories, ideas and thoughts from MindLog</p>
       </div>
        {loading && <p className='loading-text'>Loading...</p>}
        <div className='postlist-container'>
            {posts?.map(p=>(
                <div className='single-post' key={p.id}>
                    <img src={p.image}/>
                    <h3>{p.title}</h3>

                    <div className='post-type'>
                        {p.type?.map(t=>(
                            <span key={t}>{t}</span>
                        ))}
                    </div>

                    <span>{p.posted}</span>

                    <div className='post-actions'>
                    <Link to={`/read/${p.id}`}>Read More</Link>
                                        <button 
                        className='delete-btn' 
                        type='button' 
                        onClick={(e)=>deletePost(e,p.id)}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9zM7 9h2v8H7V9z"/>
                        </svg>
                    </button>

                    <Link className='update-btn' to={`/edit/${p.id}`}>
                        <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </Link>
                    </div>
                </div>
            ))}
        </div>
       {!loading && posts?.length === 0 && (
  <div className="empty-state">
    <h3>No Posts Found</h3>
    <p>You haven't created any posts yet.</p>
  </div>
)}
    </div>
  )
}
