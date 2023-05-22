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

export const verifyUserEmailToResetPassword = async (email) => {
  try {
    const config = { headers: { email: email } };
    var response = await API.get("/verifyemail", config);
    return response;
  } catch (error) {
    return null;
  }
};

export const updateNewPassword = async (updatedPassword) => {
  try {
    var response = await API.post("/updatepassword", {
      updateNewPassword: updatedPassword,
    });
    return response;
  } catch (error) {
    return null;
  }
};

export const verifySentEmailBeforeResetPage = async () => {
  try {
    var response = await API.get("/verifyresetpage");
    return response;
  } catch (error) {
    return null;
  }
};

export const getUserDetailsAndVerifyToken = async() => {
  try {
    const token = localStorage.getItem("user_auth_app_token");
    const config = { headers: { token: token } };
    var response = await API.get("/getuserdetails", config);
    return response
  } catch (error) {
    return null;
  }
};
