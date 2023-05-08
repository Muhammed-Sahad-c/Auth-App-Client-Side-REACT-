import React, { useEffect, useState } from 'react'
import './homepage.css'
import Spinner from '../spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsAndVerifyToken } from '../../API/authAPI';

function HomePage() {
    const [user, setUserDetails] = useState({});
    // const dispatch = useDispatch();
    const state = useSelector(state => { return state });
    const { spinner } = state;
    var navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('user_auth_app_token');
        if (token) getUserDetailsAndVerifyToken(token).then(response => {
            const { userDetails, status } = response.data;
            if (status === false) navigate('/login');
            else if (userDetails) setUserDetails(userDetails);
            else setUserDetails('')
        })
        else navigate('/login');
    }, []);

    const handleSpinner = () => {
        if (spinner === true) {
            return (
                <div className="spinnerBody">
                    <div className='spinnerInnerBody'>
                        <Spinner size={'30px'} color={'white'} />
                    </div>
                </div>
            )
        }
    }

    const logout = () => {
        setUserDetails(null);
        localStorage.removeItem('user_auth_app_token');
        navigate('/login')
    }

    return (
        <div>
            <div className='mybody'>
                <div className="container position-relative">
                    <div className="row ">
                        <div className="col-12  profilebody text-white text-end py-3"><button className=' text-white btnforlgout px-3 rounded py-1 text-uppercase' onClick={logout}>Logout ></button></div>
                    </div>
                    <div className="profileRound ">
                        <div className='text-white font-bold'><h1>P</h1></div>
                    </div>
                </div>
            </div>
            {handleSpinner()}
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center my-5 py-5">
                    <div className="col-5 profileInfo py-5 text-center rounded ">
                        <h4>{user.username}</h4>
                        <h4>{user.email}</h4>
                        <h5>UID : {user._id}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage