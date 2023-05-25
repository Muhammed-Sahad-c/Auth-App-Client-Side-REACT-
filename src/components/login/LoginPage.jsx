import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer'
import { setAlert } from '../../reducers/AlertReducers.js';
import { loginDataAuthentication } from '../../API/authAPI'
import Spinner from '../spinner/Spinner'
import Alert from '../alert/Alert.jsx';

function LoginPage() {

    var dispatch = useDispatch();
    var navigate = useNavigate();

    const state = useSelector(state => { return state });
    const { spinner, error, alert } = state;
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
    const { email, password } = loginInfo;

    //error handler function
    const handleErrors = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message))
    }

    //alert Handler
    var AlertHandler = () => { if (alert === 'd-block') return <Alert display={alert} /> }

    //handle form data
    const handleFormData = e => {
        dispatch(setLoader(true))
        if (!email || !password) handleErrors(false, 'please fill the form')
        else {
            loginDataAuthentication(loginInfo).then(response => {
                if (response) {
                    const { status, message, token } = response.data
                    if (status === false) handleErrors(false, message)
                    else {
                        localStorage.setItem('user_auth_app_token', token);
                        navigate('/')
                    }
                } else {
                    handleErrors(false)
                    dispatch(setAlert('d-block'))
                }
            })
        }
        e.preventDefault();
    }


    return (
        <div>
            <div className='authPageOuter'>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4 col-12 bg-white p-4 rounded authBody">
                            <div>
                                <div className='py-3 '>
                                    <h3 className='text-uppercase'>Login</h3>
                                </div>
                                <div>
                                    <form onSubmit={handleFormData}>
                                        <input type="email" className='w-100 px-1 py-2 my-1' placeholder='email' value={email} onChange={e => { setLoginInfo({ email: e.target.value, password: password }) }} />
                                        <input type="password" className='w-100 px-1 py-2 my-1' placeholder='password' value={password} onChange={e => { setLoginInfo({ email: email, password: e.target.value }) }} />
                                        <p className="text-danger text-lowerCase mt-2">{error}</p>
                                        <button className="rounded w-100 d-flex justify-content-center  px-4 text-uppercase mb-1"> {spinner === true ? <Spinner size={'24px'} color={'white'} /> : 'Login'}</button>
                                        <p className="py-1">Don't Have an Account ? <a href="/signup">Signup</a></p>
                                        <div className="text-center">
                                            <small><a href="/reset" className='text-decoration-none'>forgot password ?</a></small>
                                        </div>
                                    </form>
                                    {/* with google */}
                                    <div className="d-flex justify-content-center mt-4">
                                        <button className='text-decoration-none text-dark' style={{ background: 'white' }} onClick={() => alert('f')}>
                                            <div className='googleOuter d-flex justify-content-center '>
                                                <div className='googlebutton'> <img src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="" className='google' /></div>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {AlertHandler()}
        </div>
    )
}

export default LoginPage