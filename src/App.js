import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // HashRouter,
import NavBar from './navbar';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Logout from './logout';

export const store = createContext();

function Spa() {
  const [token, setToken] = useState(null);
  const [loggedEmail, setloggedEmail] = useState("");
  return (
    <store.Provider value={[token, setToken, loggedEmail, setloggedEmail]}>
    <BrowserRouter>
      <NavBar />
     
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/CreateAccount" element={<CreateAccount/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
     
    </BrowserRouter>
    </store.Provider>
  );
}

export default Spa;
