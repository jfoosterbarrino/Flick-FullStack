import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import AppContextProvider from './context/AppContext';
import MovieContextProvider from './context/MovieContext';
import {ThemeProvider} from '@mui/material/styles';
import primaryTheme from './themes/primaryTheme';
import {BrowserRouter} from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDWZqDgF9rHLq0cLj_Ygjo0DEHCFTp2Bfo",
  authDomain: "flick-app-46e56.firebaseapp.com",
  projectId: "flick-app-46e56",
  storageBucket: "flick-app-46e56.appspot.com",
  messagingSenderId: "30698894135",
  appId: "1:30698894135:web:1ec03362ea8cccf512e0b2",
  measurementId: "G-9SY7E0XGFZ"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <ThemeProvider theme = {primaryTheme}>
    <AppContextProvider>
    <MovieContextProvider>
    <App />
    </MovieContextProvider>
    </AppContextProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
