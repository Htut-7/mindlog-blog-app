import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase/Firebase";

export default function useSignup() {

    let [error,setError]=useState('');
    let [loading,setLoading]=useState('');
    let signUp=async(email,password)=>{
        try{
            setLoading(true);
            let res=await createUserWithEmailAndPassword(auth,email,password)
            setLoading(false);
            return (res.user)
        }catch(e){
            setError(e.message);
            setLoading(false);
        }
    }

  return {error,loading,signUp }
}
