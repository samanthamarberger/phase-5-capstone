import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/user';
import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';
import Specialities from './Specialities';
import Trainers from './Trainers';
import Signup from './Signup';
import Profile from './Profile';
import SpecialityAdd from './SpecialityAdd';
import Appointments from './Appointments';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<Signup />}/>
          <Route exact path='/specialities' element={<Specialities />} />
          <Route exact path='/specialities/:id' element={<Trainers />} />
          <Route exact path='/profile' element={<Profile />}/>
          <Route exact path='/specialities/new' element={<SpecialityAdd />} />
          <Route exact path='appointments' element={<Appointments />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
