import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DatabaseList from './components/DatabaseList';
import ClubsList from './components/clubs/ClubsList';
import Root from './components/Root';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import store from './database/store'
import NestedData from './components/structure/Nestdata';



const firebaseConfig = {
  apiKey: "AIzaSyCsKfZrEwwV9Hc4kPr6aNsV5KAeY6ImpU4",
  authDomain: "sportbanners-1163a.firebaseapp.com",
  databaseURL: "https://sportbanners-1163a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sportbanners-1163a",
  storageBucket: "sportbanners-1163a.appspot.com",
  messagingSenderId: "462554446638",
  appId: "your-app-id"
};



const root = ReactDOM.createRoot(document.getElementById('root'));
initializeApp(firebaseConfig);
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="./" element={<Root />}>
          <Route index element={<App />} />
          <Route path="database" element={<NestedData />} />
          <Route path="database/groups" element={<ClubsList />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
