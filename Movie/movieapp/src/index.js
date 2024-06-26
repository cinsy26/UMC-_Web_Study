import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { LoginProvider } from './hooks/LoginContext'; // 경로 수정


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <LoginProvider>
        <App />
    </LoginProvider>
  </BrowserRouter>
);

