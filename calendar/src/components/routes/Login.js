import React, { useEffect } from 'react';
import MicrosoftLogin from "react-microsoft-login";
import { loginUserMicrosoft, tokenValid } from "../../API/API";
import cookie from 'react-cookies'
import {
  useHistory,
} from "react-router-dom";

export default function Login() {
  let history = useHistory();

  useEffect(() => {

    async function redirect() {
      if (cookie.load('user')) {
        if (await tokenValid(cookie.load('user'))) {
          history.push("/home")
        }
      }
    }

    redirect();
  });
  async function authHandler(err, data) {
    if (err) {
      // manage error
      return;
    }
    data = data['authResponseWithAccessToken']['account'];
    let result = await loginUserMicrosoft(data['name'], data['userName'], data['accountIdentifier'])
    if (result['errors']) {
      // manage error
      return;
    }
    let d = new Date();
    d.setTime(d.getTime() + (3600 * 60 * 1000));
    cookie.save("user", result, { path: "/", expires: d });
    history.push("/home")
  }

  return (
    <div className="App">
      <header className="App-header">
        <MicrosoftLogin clientId={process.env.REACT_APP_CLIENT_ID} authCallback={authHandler} />
      </header>
    </div>
  );
}
