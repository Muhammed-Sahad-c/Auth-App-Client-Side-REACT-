import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer'
import { setAlert } from '../../reducers/AlertReducers';
import { verifyUserEmailToResetPassword } from '../../API/authAPI';
import Spinner from '../spinner/Spinner'
import Alert from '../alert/Alert';
import './resetPassword.css'

function ResetPassword() {
  const dispatch = useDispatch();
  const state = useSelector(state => { return state });
  const { error, spinner, alert } = state;
  const [email, setEmail] = useState('');

  //error handler function
  const handleErrors = (status, message = null) => {
    dispatch(setLoader(status));
    dispatch(showError(message))
  }

  //alert Handler
  var alertHandler = () => { if (alert === 'd-block') return <Alert display={alert} /> }

  const handleFormData = e => {
    e.preventDefault();
    dispatch(setLoader(true));
    if (!email) handleErrors(false, `please enter the email`);
    else {
      verifyUserEmailToResetPassword(email).then(response => {
        if (response) {
          const { status, message } = response.data;
          if (!status) handleErrors(false, message);
        } else {
          handleErrors(false);
          dispatch(setAlert(`d-block`))
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
      {alertHandler()}
    </div>
  )
}

export default ResetPassword