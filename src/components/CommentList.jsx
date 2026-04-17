import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import "../css/CommentList.css";
import Comment from './comment';
import moment from 'moment';

export default function CommentList() {

    let {id}=useParams();
    let {reactComment,deleteDocument,getCollection}=useFirestore();
    let {error,loading,data:comments}=getCollection('comments',['postUid','==',id]);

    let [editNotes,setEditNotes]=useState('');

    if(error){
        return <p>{error}</p>
    }

    let deleteComment=async(e,id)=>{
        e.preventDefault();
        await deleteDocument('comments',id);
    }

  return (
    <div className='comment-list'>
        {loading && <p>Loading...</p>}
            <div className='comment'>
             {comments && comments.map(c=>(
                <div className='single-comment' key={c.id}>
                    <h4>{c.name}</h4>
                    {editNotes?.id === c.id ? (
  <Comment
    type="edit"
    setEditNotes={setEditNotes}
    editNotes={editNotes}
  />
) : (
  <p>{c.body}</p>
)}

                    <p className='moment'>
                        {moment(c?.date?.seconds * 1000).fromNow()}
                    </p>
                    
                <div className='comment-action'>
                    <button 
                        className='delete-btn' 
                        type='button' onClick={(e)=>(deleteComment(e,c.id))}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9zM7 9h2v8H7V9z"/>
                        </svg>
                    </button>

                    <button className='update-btn' onClick={()=>setEditNotes(c)}>
                        <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>

                    <button onClick={() => reactComment("comments", c.id, "like")} className="react-btn">
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path
      d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.3l.9-4.6.03-.32c0-.41-.17-.79-.44-1.06L13.17 2 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h7c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"
      fill="currentColor"
    />
  </svg>

  <span>{c.reactions?.like || 0}</span>
</button>
                </div>

                </div>
                ))}
            </div>
    </div>
  )
}
