import React from 'react';
import './index.css';
import {Route,Routes } from 'react-router-dom';
import Login from './Component/Login';
import ClassRoom from './Component/ListClassroom';
import Profile from './Component/Profile';
import Register from './Component/Register';
import ShowDetailClass from './Component/ShowDetailClass';
import VerifyAccount from './Component/VerifyAccount';
import ForgotPassword from './Component/ForgotPassword';
import GradeReview from './Component/GradeReview';
import PageAdmin from './Component/PageAdmin';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/verifyemail/:tokenEmail' element={<VerifyAccount/>}/>
          <Route exact path='/classroom' element={<ClassRoom />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/classroom/:link' element={<ShowDetailClass />} />
          <Route exact path='/classroom/:link/gradereview/:assignmentId' element={<GradeReview/>}/>
          <Route exact path='/forgotpassword' element={<ForgotPassword />} />
          <Route exact path='/gradereview' element={<GradeReview/>} />
          <Route exact path='/pageAdmin' element={<PageAdmin/>}/>
          <Route path='*' element={<Login />} />

        </Routes>
    </div>
  );
}

export default App;
