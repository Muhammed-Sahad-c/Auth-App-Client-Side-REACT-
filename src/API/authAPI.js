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
  const config = { headers: { email: email } };
  return API.get("/verifyemail", config);
};

export const updateNewPassword = (updatedPassword) => {
  return API.post("/updatepassword", { updateNewPassword: updatedPassword });
};

export const verifySentEmailBeforeResetPage = () => {
  return API.get("/verifyresetpage");
};

export const getUserDetailsAndVerifyToken = () => {
  const token = localStorage.getItem("user_auth_app_token");
  const config = { headers: { token: token } };
  return API.get("/getuserdetails", config);
};
