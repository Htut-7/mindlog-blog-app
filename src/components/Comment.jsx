import React, { useEffect, useState } from 'react';
import "../css/Comment.css";
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';

export default function Comment({ type = 'create', setEditNotes, editNotes }) {
  let [body, setBody] = useState('');
  let [name, setName] = useState('');

  let { updateDocument, addCollection } = useFirestore();
  let { id } = useParams();

  useEffect(() => {
    if (type === 'edit' && editNotes) {
      setName(editNotes.name);
      setBody(editNotes.body);
    }
  }, [type, editNotes]);

  let addComment = async (e) => {
    e.preventDefault();

    if (type === 'create') {
      await addCollection('comments', {
        name,
        body,
        postUid: id
      });
    } else {
      await updateDocument('comments', editNotes.id, {
        name,
        body
      });

      setEditNotes(null);
    }

    setBody('');
    setName('');
  };

  return (
    <div className='comment-section'>
      <h3>Comments</h3>

      <form className='comment-form' onSubmit={addComment}>
        <input
          type='text'
          placeholder='Enter your Name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <textarea
          placeholder='Write a Comment...'
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />

        <button type='submit'>
          {type === 'create' ? 'Send' : 'Update'}
        </button>

        {type === 'edit' && (
          <button
            type='button'
            className='cancel-btn'
            onClick={() => setEditNotes(null)}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}