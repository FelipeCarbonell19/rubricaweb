import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCqCWi10N-8UBDXpUMVXVV6YVti94yLul8",
  authDomain: "crudwebjueves.firebaseapp.com",
  projectId: "crudwebjueves",
  storageBucket: "crudwebjueves.appspot.com",
  messagingSenderId: "693774698231",
  appId: "1:693774698231:web:fc1836d11a0739957275f2",
};
  
  // Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db,auth}