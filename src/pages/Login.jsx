import React, { useEffect } from 'react'
import LoginPage from '../components/login/LoginPage'
import { useNavigate } from 'react-router-dom';
import { getUserDetailsAndVerifyToken } from '../API/authAPI';

function Login() {
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
      <LoginPage />
    </div>
  )
}

export default Login