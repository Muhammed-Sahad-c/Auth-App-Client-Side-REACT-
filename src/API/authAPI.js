import axios from "axios"

const baseURL = 'http://localhost:8000'

const API = axios.create({ baseURL })


export const signupDataSubmission = data => {
    return API.post('/signup', data);
}

export const loginDataAuthentication = data => {
    const config = { headers: { email: data.email, password: data.password } }
    return API.get('/login', config)
}

export const verifyUserEmailToResetPassword = email => {
    const config = { headers: { email: email } };
    return API.get('/verifyemail', config);
}

export const updateNewPassword = updatedPassword => {
    return API.post('/updatepassword', { updateNewPassword: updatedPassword })
}

export const verifySentEmailBeforeResetPage = () => {
    return API.get('/verifyresetpage');
}

export const getUserDetailsAndVerifyToken = () =>{
    const token = localStorage.getItem('user_auth_app_token');
    const config = {headers: {token:token}}
    return API.get('/getuserdetails',config);
}

 