import axios from "axios";

const baseURL = "http://localhost:8000";

const API = axios.create({ baseURL });

export const otpUpdator = () => {
  try {
    return API.get("/updateotp");
  } catch (error) {
    return null;
  }
};

export const resentOtp = () => {
  try {
    return API.get("/resentotp");
  } catch (error) {
    return null;
  }
};

export const verifyOTP = (otp) => {
  try {
    return API.post("/verifyotp", { otp: otp });
  } catch (error) {
    return null;
  }
};
