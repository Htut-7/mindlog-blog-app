import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../css/Read.css";
import Comment from '../components/comment';
import CommentList from '../components/CommentList';

export default function Read() {

    const {id}=useParams();

    let {getDocument} =useFirestore();
    let {error,loading,data:posts}=getDocument('posts',id);

    if(error){
        return <p className='error-text'>{error}</p>
    }

  return (
    <div className='read'>
        {loading && <p className='loading-text'>Loading...</p>}
        <div className='read-container'>
            {posts && (
                <div className='detail-post'>
                    <img src={posts.image}/>
                    <h3>{posts.title}</h3>

                    <div className='post-type'>
                        {posts.type?.map(t=>(
                            <span key={t}>{t}</span>
                        ))}
                    </div>

                    <span>{posts.posted}</span>
                    <p>{posts.story}</p>

                    <Link to='/'>Back</Link>
                </div>
            )}
        </div>
       <div className='wrapper'>
         <Comment/>
        <CommentList/>
       </div>

    </div>
   
  )
}
