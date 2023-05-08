import React, { useEffect } from 'react'
import SignupPage from '../components/signup/SignupPage';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsAndVerifyToken } from '../API/authAPI';

function Signup() {
  var navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('user_auth_app_token');
    if (token) getUserDetailsAndVerifyToken(token).then(response => {
      const { userDetails, status } = response.data;
      if (status === true) navigate('/');
    })
  }, []);
  
  return (
    <div>
      <SignupPage />
    </div>
  )
}

export default Signup