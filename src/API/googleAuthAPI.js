import axios from "axios";

const baseURL = "http://localhost:8000";

const API = axios.create({ baseURL });

export const getDetailsFromGoogle = async (token) => {
  try {
    var response = await API.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const signupWithGoogleDataSubmission = async (userData) => {
  try {
    var response = API.post("/googlesignup", userData);
    return response;
  } catch (err) {
    return null;
  }
};

export const loginWithGoogleAuthentication = async (email) => {
  try {
    const config = { headers: { email: email } };
    var response = await API.get("/googlelogin", config);
    return response;
  } catch (err) {
    return null;
  }
};
