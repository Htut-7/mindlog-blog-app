import React, { useState } from 'react';
import {auth} from "../firebase/Firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function useSignin() {

    let [error,setError]=useState('');
    let [loading,setLoading]=useState('');
    let signIn=async(email,password)=>{
        try{
            setLoading(true);
            let ref=await signInWithEmailAndPassword(auth,email,password);
            setLoading(false);
            return (ref.user);
        }
        catch(e){
            setError(e.message);
            setLoading(false);
        }
    }

  return {error,loading,signIn}
}
