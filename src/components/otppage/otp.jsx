import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './otp.css'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner'
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer';
import { resentOtp, verifyOTP } from '../../API/otpAPI';
import { verifySentEmailBeforeResetPage } from '../../API/authAPI';

function Otp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => { return state });
  const { spinner, error } = state;
  const [otp, setOtp] = useState('');
  const [otpStatus, setOtpStatus] = useState('d-none');
  const [otpForm, setOtpForm] = useState({ formStatus: 'd-block', otpFailCount: 0 });
  const { otpFailCount, formStatus } = otpForm;


  //error handler function
  const handleErrors = (status, message = null) => {
    dispatch(setLoader(status));
    dispatch(showError(message))
  }


  setTimeout(() => {
    if (otpStatus === 'd-block') setOtpStatus('d-none')
  }, 2000)


  const resend = () => {
    resentOtp().then(response => {
      const { status, message } = response.data;
      if (status === false) dispatch(showError(message));
      else setOtpStatus('d-block');
    })
  }


  useEffect(() => {
    // sent API call for checking a email sent or not.
    verifySentEmailBeforeResetPage().then(response => {
      if (!response.data.isAllowed) navigate('/error')
    });
    handleErrors(false)
  }, []);


  //hanlde otp
  const handleFormData = e => {
    console.log(otpForm.otpFailCount)
    dispatch(setLoader(true))
    if (!otp) handleErrors(false, `enter 4 digit OTP`)
    else {
      if (otpFailCount < 3) {
        verifyOTP(otp).then(response => {
          const { status, message, token } = response.data;
          if (status === false) {
            handleErrors(false, message)
            setOtpForm({ otpFailCount: otpForm.otpFailCount + 1 });
          } else {
            localStorage.setItem('user_auth_app_token', token)
            handleErrors(false);
            navigate('/')
          }
        })
      } else setOtpForm({ formStatus: 'd-none', otpFailCount: otpFailCount })
    }
    e.preventDefault();
  }

  return (
    <>
      <div className='authPageOuter'>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-4 col-12 bg-white p-4 rounded authBody">
              <div>
                <div className='py-3 d-flex justify-content-between'>
                  <h3 className='text-uppercase'>Verify OTP</h3>
                </div>
                <div>
                  <form onSubmit={handleFormData} className={`${formStatus}`}>
                    <input type="number" className='w-100 px-5 text-center py-2 my-1 otp text-uppercase' value={otp} onChange={e => { setOtp(e.target.value); }} />
                    <label htmlFor="">enter otp</label>
                    <p className="text-danger text-center text-lowerCase mt-2">{error}</p>
                    <button className="rounded w-100 d-flex justify-content-center  px-4 text-uppercase mb-1"> {spinner === true ? <Spinner size={'24px'} color={'white'} /> : 'verify'}</button>
                    <h5 className={`py-2  ${otpStatus} d-flex justify-content-center align-items-center `}>OTP sent! ✅</h5>
                  </form>
                  <p className='text-center mt-3'><span className='resent cursor-pointer' onClick={() => resend()}>resend OTP</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otp