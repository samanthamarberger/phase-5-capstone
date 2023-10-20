import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/user';
import Login from './Login';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route exact path='/login' element={<Login />}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
