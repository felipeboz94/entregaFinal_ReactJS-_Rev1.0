import React from 'react';
import ReactDOM from 'react-dom/client';
import {initializeApp} from 'firebase/app'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartContextProvider } from './contexts/CartContext';

//config de firebase
const firebaseConfig = {
  apiKey: "AIzaSyCimYTCGyd6ZIUKz-gmhe78_fji1U38A14",
  authDomain: "ecommercepokemon.firebaseapp.com",
  projectId: "ecommercepokemon",
  storageBucket: "ecommercepokemon.appspot.com",
  messagingSenderId: "1002441552642",
  appId: "1:1002441552642:web:21cdaa60654f8efa4b081b",
  measurementId: "G-X79E9BD81X"
};

initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
