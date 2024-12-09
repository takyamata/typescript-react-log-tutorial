// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAjTtP81Ai0_us6XKTvWZSfz2XeGf69LsY',
    authDomain: 'typescript-react-log-tutorial.firebaseapp.com',
    projectId: 'typescript-react-log-tutorial',
    storageBucket: 'typescript-react-log-tutorial.firebasestorage.app',
    messagingSenderId: '516966415524',
    appId: '1:516966415524:web:415ea8c47db8f12a927a31',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestoreも使う場合はインポートして初期化する必要がある
const db = getFirestore(app);
export { db };
