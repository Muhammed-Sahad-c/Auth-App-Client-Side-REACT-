import axios from "axios";

const baseURL = "http://localhost:8000";

const API = axios.create({ baseURL });

export const signupDataSubmission = async (data) => {
  try {
    var response = await API.post("/signup", data);
    return response;
  } catch (error) {
    return null;
  }
};

export const loginDataAuthentication = async (data) => {
  try {
    const config = { headers: { email: data.email, password: data.password } };
    var response = await API.get("/login", config);
    return response;
  } catch (err) {
    return null;
  }
};

export const verifyUserEmailToResetPassword = (email) => {
  try {
    const config = { headers: { email: email } };
    return API.get("/verifyemail", config);
  } catch (error) {
    return null;
  }
};

export const updateNewPassword = (updatedPassword) => {
  try {
    return API.post("/updatepassword", { updateNewPassword: updatedPassword });
  } catch (error) {
    return null;
  }
};

export const verifySentEmailBeforeResetPage = () => {
  try {
    return API.get("/verifyresetpage");
  } catch (error) {
    return null;
  }
};

export const getUserDetailsAndVerifyToken = () => {
  try {
    const token = localStorage.getItem("user_auth_app_token");
    const config = { headers: { token: token } };
    return API.get("/getuserdetails", config);
  } catch (error) {
    return null;
  }
};
