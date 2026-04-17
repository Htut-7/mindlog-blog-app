import React, { useEffect } from 'react';
import { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import "../css/PostForm.css";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getDoc,doc } from 'firebase/firestore';
import {db} from "../firebase/Firebase";
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

export default function PostForm() {

    let [title,setTitle]=useState('');
    let [image,setImage]=useState('');
    let [newType,setNewType]=useState('');
    let [posted,setPosted]=useState('');
    let [story,setStory]=useState('');
    let [type,setType]=useState([]);
    const navigate=useNavigate();
    let [edit,setEdit]=useState(false);
    const {id}=useParams();

    let {addCollection,updateDocument}=useFirestore();

    useEffect(()=>{
        if(id){
            setEdit(true);
            let ref=doc(db,'posts',id);
            getDoc(ref).then(docs=>{
                if(docs.exists()){
                    let {title,image,type,posted,story}=docs.data();
                    setTitle(title);
                    setImage(image);
                    setType(type);
                    setPosted(posted);
                    setStory(story);
                }else{
                    setEdit(false);
                    setTitle('');
                    setImage('');
                    setType([]);
                    setPosted('');
                    setStory('');
                }
            })
        }
    },[id])

    let addType=(e)=>{
        e.preventDefault();
        if(newType && type.includes(newType)){
            setNewType('');
            return
        }
        setType(prev=>[newType, ...prev]);
        setNewType('');
    }

    let {user}=useContext(AuthContext)

    let addPost=async(e)=>{
        e.preventDefault();
        let data={
            title,
            image,
            type,
            posted,
            story,
            uid:user.uid
        }
        if(edit){
            await updateDocument('posts',id,data);
            navigate('/explore');
        }
        else{
        await addCollection('posts',data);
        setTitle('');
        setImage('');
        setNewType('');
        setPosted('');
        setStory('');
        navigate('/explore');
        }
    }

  return (
    <form className='create-form' onSubmit={addPost}>
        <div className='form-container'>
            <h2>Create your Story</h2>
            <p>Share your thoughts, ideas, and stories with the world</p>

            <div className='form-input'>
                <label>Title</label>
                <input type='text' placeholder='Enter Story Title' onChange={(e)=>setTitle(e.target.value)} value={title}/>

                <label>Cover Image</label>
                <input type='text' placeholder='Enter image Url' onChange={(e)=>setImage(e.target.value)} value={image}/>
               {image && <img src={image} alt={title}/>}

              <div className='type'>
                  <label>Story Type</label>
                <input type='text' placeholder='Enter your Story Type' onChange={(e)=>setNewType(e.target.value)} value={newType}/>
                <button type='button' className='type-addbtn' onClick={addType}>+</button>
              </div>

                <div className='post-type'>
                        {type?.map(t=>(
                            <span key={t}>{t}</span>
                        ))}
                    </div>


                <label>Posted By</label>
                <input type='text' placeholder='Enter your Name' onChange={(e)=>setPosted(e.target.value)} value={posted}/>

                <label>Story</label>
                <textarea type='text' placeholder='Write your Story here...' onChange={(e)=>setStory(e.target.value)} value={story}/>

                <button className='create-btn' type='submit'>{edit ? 'Update' : 'Post'}</button>
            </div>
        </div>
    </form>
  )
}
