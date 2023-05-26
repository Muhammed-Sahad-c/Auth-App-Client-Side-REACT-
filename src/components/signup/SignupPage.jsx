import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer'
import { setAlert } from '../../reducers/AlertReducers.js';
import { signupDataSubmission } from '../../API/authAPI'
import Alert from '../alert/Alert.jsx';
import Spinner from '../spinner/Spinner'
import './signup.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGoogleLogin } from '@react-oauth/google';
import { getDetailsFromGoogle, signupWithGoogleDataSubmission } from '../../API/googleAuthAPI.js';


function SignupPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        handleErrors(false)
        dispatch(setAlert('d-none'));
    }, []);


    const state = useSelector(state => { return state });
    const { spinner, error, alert } = state;
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: '', repassword: '' });
    const { username, email, password, repassword } = userInfo;

    //error Handler 
    const handleErrors = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message))
    }

    //alert Handler
    var alertHandler = () => { if (alert === 'd-block') return <Alert display={alert} /> }


    // signup data submission
    const handleFormData = e => {
        dispatch(setLoader(true))
        if (!username || !email || !password || !repassword) handleErrors(false, 'please fill the form')
        else if (password !== repassword) handleErrors(false, `password didn't match!`)
        else if (password.length < 8 || repassword.length < 8) handleErrors(false, `password should contain atleast 8 letters!`)
        else {
            signupDataSubmission(userInfo).then(response => {
                if (response) {
                    const { status, message } = response.data;
                    if (status === true) navigate('/otp');
                    else handleErrors(false, message);
                } else {
                    handleErrors(false);
                    dispatch(setAlert('d-block'));
                }
            })
        }
        e.preventDefault();
    }

    const signUpWithGoogle = useGoogleLogin({
        onSuccess: codeResponse => {
            getDetailsFromGoogle(codeResponse.access_token).then(userDetails => {
                if (!userDetails) dispatch(setAlert(`d-block`));
                else {
                    //update data in backend
                    const data = {
                        email: userDetails.data.email,
                        username: userDetails.data.name,
                        google: true
                    }
                    signupWithGoogleDataSubmission(data).then(response => {
                        if (!response) dispatch(setAlert(`d-block`));
                        else {
                            const { token, message, status } = response.data;
                            if (status === false) toast(message)
                            else {
                                localStorage.setItem('user_auth_app_token', token);
                                navigate('/');
                                handleErrors(false);
                            }
                        }
                    })
                }
            })
        },
        onError: error => dispatch(setAlert(`d-block`))
    });

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
                                        <input type="password" className='w-100 px-1 py-2 my-1' placeholder='re-enter password' value={repassword} onChange={e => { setUserInfo({ username: username, email: email, password: password, repassword: e.target.value }) }} />
                                        <p className="text-danger text-lowerCase mt-2">{error}</p>
                                        <button className="rounded w-100  d-flex justify-content-center px-4 text-uppercase mb-1">{spinner === true ? <Spinner size={'24px'} color={'white'} /> : 'Signup'}</button>
                                        <p className="py-1">Already Have an Account ? <a href="/login">Login</a></p>
                                        <div className='d-flex'>
                                        </div>
                                    </form>
                                    {/* Signup with google */}
                                    <div className="d-flex justify-content-center mt-4">
                                        <button className='text-decoration-none text-dark' style={{ background: 'white' }} onClick={() => signUpWithGoogle()}>
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
            {alertHandler()}
            <ToastContainer />
        </>
    )
}

export default SignupPage