import axios from "axios"

const baseURL = 'http://localhost:8000'

const API = axios.create({ baseURL });

export const otpUpdator = () => {
    return API.get('/updateotp');
}

export const resentOtp = () => {
    return API.get('/resentotp');
}

export const verifyOTP = otp => {
    return API.post('/verifyotp',{otp:otp})
}