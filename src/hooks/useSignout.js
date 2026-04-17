import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import {auth} from "../firebase/Firebase";

export default function useSignout() {

    let [error,setError]=useState('');
    let [loading,setLoading]=useState('');
    const logOut=async()=>{
        try{
            setLoading(true);
            let res=await signOut(auth);
            setLoading(false);
            setError('');
            return (res.user);
        }catch(e){
            setError(e.message);
            setLoading(false);
        }
    }

  return {error,loading,logOut}
}
