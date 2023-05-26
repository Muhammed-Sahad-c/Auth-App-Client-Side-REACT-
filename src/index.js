import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <GoogleOAuthProvider clientId={`329428531488-bhffhintsg028uv35bpnhdrb9s6fol15.apps.googleusercontent.com`}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
