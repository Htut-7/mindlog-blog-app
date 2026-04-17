import React from 'react'
import { Link } from 'react-router-dom';
import "../css/RecentPosts.css";
import useFirestore from '../hooks/useFirestore';

export default function RecentPosts() {

    let {getCollection}=useFirestore();
    let {error,loading,data:posts}=getCollection('posts');

    if(error){
        return <p>{error}</p>
    }

  return (
    <section className='recent-section'>
        <div className='recent-container'>
        {loading && <p>Loading...</p>}
            <div className='recent-header'>
                <h2>Recent Posts</h2>
            </div>

            <div className='post-grid'>
                {posts.map(p=>(
                    <div className='single-post' key={p.id}>
                        <img src={p.image}/>
                        <h3>{p.title}</h3>
                        <div className='post-type'>
                            {p.type?.map(t=>(
                                <span key={t}>{t}</span>
                            ))}
                        </div>
                        <span>Posted By: {p.posted}</span>

                        <Link to={`/read/${p.id}`}>Read More</Link>
                    </div>
                ))}

            </div>
        </div>
    </section>
  )
}
