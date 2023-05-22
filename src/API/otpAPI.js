import axios from "axios";

const baseURL = "http://localhost:8000";

const API = axios.create({ baseURL });

export const otpUpdator = async () => {
  try {
    var response = await API.get("/updateotp");
    return response;
  } catch (error) {
    return null;
  }
};

export const resentOtp = async () => {
  try {
    var response = await API.get("/resentotp");
    return response;
  } catch (error) {
    return null;
  }
};

export const verifyOTP = async (otp) => {
  try {
    var response = await API.post("/verifyotp", { otp: otp });
    return response;
  } catch (error) {
    return null;
  }
};
