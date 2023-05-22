import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showError } from '../../reducers/ErrorReducers.js';
import { setLoader } from '../../reducers/loadingReducer';
import { updateNewPassword } from '../../API/authAPI.js';
import Spinner from '../spinner/Spinner.jsx';
import Alert from '../alert/Alert.jsx';
import { setAlert } from '../../reducers/AlertReducers.js';

function ResetForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [resetPassword, setResetPassword] = useState({ password: '', confirmPassword: '' });
    const { password, confirmPassword } = resetPassword;
    const state = useSelector(state => { return state });
    const { error, spinner, alert } = state;

    //error handler function
    const handleErrors = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message))
    }

    //alert Handler
    var alertHandler = () => { if (alert === 'd-block') return <Alert display={alert} /> }

    const handleFormData = e => {
        dispatch(setLoader(true))
        if (!password || !confirmPassword) handleErrors(false, `please fill the form`)
        else if (password !== confirmPassword) handleErrors(false, `password didn't match!`)
        else {
            updateNewPassword(password).then(response => {
                if (response) {
                    const { status, meassage } = response.data;
                    if (status) navigate('/');
                    else handleErrors(false, meassage);
                } else {
                    handleErrors(false);
                    dispatch(setAlert(`d-block`))
                }
            })
        }
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
            {alertHandler()}
        </div>
    )
}

export default ResetForm