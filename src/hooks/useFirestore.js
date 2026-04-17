import React, { useEffect, useRef, useState } from 'react';
import {db} from "../firebase/Firebase";
import { addDoc, collection,deleteDoc,doc,onSnapshot,query, serverTimestamp,updateDoc,orderBy,where,increment} from 'firebase/firestore';

export default function useFirestore() {

    let getCollection=(colName,_q)=>{
        
        let qRef=useRef(_q).current
        let [error,setError]=useState('');
        let [loading,setLoading]=useState(false);
        let [data,setData]=useState([]);

        useEffect(()=>{
            setLoading(true);
            let ref=collection(db,colName);
            let queries=[];
            if(qRef){
                queries.push(where(...qRef))
            }
            queries.push(orderBy('date','desc'))
            let q=query(ref, ...queries)

             onSnapshot(q,docs=>{
                if(docs.empty){
                    setError('No Data Found');
                    setLoading(false);
                }else{
                    let collectionDatas=[];
                    docs.forEach(doc=>{
                        let document={id:doc.id, ...doc.data()}
                        collectionDatas.push(document);
                    })
                    setData(collectionDatas);
                    setLoading(false);
                    setError(null)
                }
             })

        },[colName,qRef])
        return {error,loading,data}
    }

    let getDocument=(colName,id)=>{
        
        let [error,setError]=useState('');
        let [loading,setLoading]=useState(false);
        let [data,setData]=useState([]);

        useEffect(()=>{
            setLoading(true)
            let ref=doc(db,colName,id);
            onSnapshot(ref,doc=>{
                if(doc.exists()){
                    let document={id:doc.id, ...doc.data()}
                    setData(document);
                    setLoading(false);
                    setError(null);
                }else{
                    setError('No Data Found');
                    setLoading(false);
                }
            })
        },[colName,id])

        return {error,loading,data}

    }

    let addCollection=async(colName,data)=>{
        data.date=serverTimestamp();
        let ref=collection(db,colName)
        await addDoc(ref,data);
    }

    let deleteDocument=async(colName,id)=>{
        let ref=doc(db,colName,id);
        await deleteDoc(ref);
    }

    let updateDocument=(colName,id,data,updateDate)=>{
        if(updateDate){
            data.date=serverTimestamp();
        }
        let ref=doc(db,colName,id);
            return updateDoc(ref,data);
    }

    let reactComment = async (collectionName, id, type) => {
  const ref = doc(db, collectionName, id);

  await updateDoc(ref, {
    [`reactions.${type}`]: increment(1)
  });
};

  return{getCollection,getDocument,addCollection,deleteDocument,updateDocument,reactComment}
}
