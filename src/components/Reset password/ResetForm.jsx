import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewPassword } from '../../API/authAPI.js';
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer'
import {useNavigate} from 'react-router-dom';
import Spinner from '../spinner/Spinner.jsx';
function ResetForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resetPassword, setResetPassword] = useState({ password: '', confirmPassword: '' });
    const { password, confirmPassword } = resetPassword;
    const state = useSelector(state => { return state });
    const { error, spinner } = state;
    const handleFormData = e => {
        dispatch(setLoader(true))
        if (!password || !confirmPassword) {
            dispatch(showError('fill the form'))
            dispatch(setLoader(false))
        } else if (password !== confirmPassword) {
            dispatch(showError(`Password didn't match!`))
            dispatch(setLoader(false))
        } else {
            updateNewPassword(password).then(response => {
                const { status, meassage } = response.data;
                if(status){
                    navigate('/');
                }else{
                    dispatch(showError(meassage))
                    dispatch(setLoader(false))
                }
            }) 
        }
        console.log(resetPassword)
        e.preventDefault();
    }
    return (
        <div>
            <div>
                <div>
                    <div className='authPageOuter'>
                        <div className="container">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-md-4 col-12 bg-white p-4 rounded authBody">
                                    <div>
                                        <div className='py-3 '>
                                            <h3 className='text-uppercase'>RESET PASSword</h3>
                                        </div>
                                        <div>
                                            <form onSubmit={handleFormData}>
                                                <input type="password" className='w-100 px-1 py-2 my-1' placeholder='password' value={password} onChange={e => { setResetPassword({ password: e.target.value, confirmPassword: confirmPassword }) }} />
                                                <input type="password" className='w-100 px-1 py-2 my-1' placeholder='confirm password' value={confirmPassword} onChange={e => { setResetPassword({ password: password, confirmPassword: e.target.value }) }} />
                                                <p className="text-danger text-lowerCase mt-2">{error}</p>
                                                <button className="rounded w-100 d-flex justify-content-center  px-4 text-uppercase mb-1"> {spinner === true ? <Spinner size={'24px'} color={'white'} /> : 'reset password'}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetForm