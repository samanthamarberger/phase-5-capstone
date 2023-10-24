import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/user';
import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
