import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <GoogleOAuthProvider clientId={`your cilent id`}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
