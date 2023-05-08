import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducers.js';
import './signup.css';
import Spinner from '../spinner/Spinner'
import { setLoader } from '../../reducers/loadingReducer'
import { signupDataSubmission } from '../../API/authAPI'
import { useEffect } from 'react';

function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(showError(''));
        dispatch(setLoader(false))
    }, []);
    const state = useSelector(state => { return state });
    const { spinner, error } = state;
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: '', repassword: '' });
    const { username, email, password, repassword } = userInfo;
    const handleFormData = e => {
        dispatch(setLoader(true))
        if (!username || !email || !password || !repassword) {
            dispatch(showError(`Fill the Form`))
            dispatch(setLoader(false))
        } else if (password !== repassword) {
            dispatch(showError(`Password didn't match!`));
            dispatch(setLoader(false))
        } else if (password.length < 8 || repassword.length < 8) {
            dispatch(showError(`Password Should contain atleast 8 letters!`))
            dispatch(setLoader(false))
        } else {
            signupDataSubmission(userInfo).then(response => {
                const { status, message } = response.data;
                if (status === true) {
                    navigate('/otp')
                } else {
                    dispatch(showError(message));
                    dispatch(setLoader(false))
                }
            })
        }

        e.preventDefault();
    }
    return (
        <>
            <div className='authPageOuter'>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className=" col-md-4 col-12 bg-white p-4 rounded authBody">
                            <div>
                                <div className='py-3 '>
                                    <h3 className='text-uppercase'>Signup</h3>
                                </div>
                                <div>
                                    <form onSubmit={handleFormData}>
                                        <input type="text" className='w-100 px-1 py-2 my-1' placeholder='username' value={username} onChange={e => { setUserInfo({ username: e.target.value, email: email, password: password, repassword: repassword }) }} />
                                        <input type="email" className='w-100 px-1 py-2 my-1' placeholder='email' value={email} onChange={e => { setUserInfo({ username: username, email: e.target.value.toLocaleLowerCase(), password: password, repassword: repassword }) }} />
                                        <input type="password" className='w-100 px-1 py-2 my-1' placeholder='password' value={password} onChange={e => { setUserInfo({ username: username, email: email, password: e.target.value, repassword: repassword }) }} />
                                        <input type="password" className='w-100 px-1 py-2 my-1' placeholder='re-Enter password' value={repassword} onChange={e => { setUserInfo({ username: username, email: email, password: password, repassword: e.target.value }) }} />
                                        <p className="text-danger text-lowerCase mt-2">{error}</p>
                                        <button className="rounded w-100  d-flex justify-content-center px-4 text-uppercase mb-1">{spinner === true ? <Spinner size={'24px'} color={'white'} /> : 'Signup'}</button>
                                        <p className="py-1">Already Have an Account ? <a href="/login">Login</a></p>
                                        <div className='d-flex'>
                                        </div>
                                    </form>
                                    <div className="d-flex justify-content-center ">
                                        <button className='text-decoration-none text-dark' style={{ background: 'white' }} onClick={() => alert('f')}>
                                            <div className='googleOuter d-flex justify-content-center px-4'>
                                                <div className='googlebutton'> <img src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="" className='google' /></div>
                                                <div className='googleTextButton  '><small>sign up with google</small></div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage