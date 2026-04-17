import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjqpMC4b7x_2sX80Zcez_QO0-zgpJfk2M",
  authDomain: "blog-9b49e.firebaseapp.com",
  projectId: "blog-9b49e",
  storageBucket: "blog-9b49e.firebasestorage.app",
  messagingSenderId: "949887003237",
  appId: "1:949887003237:web:c32c78d67c67b0c321748c",
  measurementId: "G-XR7CJSVC4T"
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth= getAuth(app);

export {db,auth}