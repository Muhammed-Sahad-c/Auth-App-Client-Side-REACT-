import React from 'react'
import './resetPassword.css'
import Spinner from '../spinner/Spinner'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer'
import { verifyUserEmailToResetPassword } from '../../API/authAPI';
function ResetPassword() {
  const dispatch = useDispatch();
  const state = useSelector(state => { return state });
  const { error, spinner } = state;
  const [email, setEmail] = useState('');
  const handleFormData = e => {
    dispatch(setLoader(true));
    if (!email) {
      dispatch(showError(`Please Enter the Email`))
      dispatch(setLoader(false));
      e.preventDefault();
    } else {
      verifyUserEmailToResetPassword(email).then(response => {
        const { status, message } = response.data;
        if (status) { } else {
          dispatch(showError(message))
          dispatch(setLoader(false));
          e.preventDefault();
        }
      })

    }
  }
  return (
    <div>
      <div>
        <div className='authPageOuter'>
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-4 col-12 bg-white p-4 rounded authBody">
                <div>
                  <div className='py-3 '>
                    <h3 className='text-uppercase'>Verify Email</h3>
                  </div>
                  <div>
                    <form onSubmit={handleFormData}>
                      <input type="email" className='w-100 px-1 py-2 my-1' placeholder='enter email' value={email} onChange={e => { setEmail(e.target.value) }} />
                      <p className="text-danger text-lowerCase mt-2">{error}</p>
                      <button className="rounded w-100 d-flex justify-content-center  px-4 text-uppercase mb-1"> {spinner === true ? <Spinner size={'24px'} color={'white'} /> : 'verify'}</button>
                    </form>
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

export default ResetPassword