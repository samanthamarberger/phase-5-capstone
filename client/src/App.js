import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route exact path='/login' element={<Login />}/>
        </Routes>
    </div>
  );
}

export default App;
