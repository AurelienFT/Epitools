import React from 'react'
import MicrosoftLogin from "react-microsoft-login";
import { loginUserMicrosoft } from "../../API/API";
import cookie from 'react-cookies'
import {
  useHistory,
} from "react-router-dom";


class Login extends React.Component {
  async authHandler(err, data) {
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
    d.setTime(d.getTime() + (3600*60*1000));
    cookie.save("user", result, {path: "/", expires: d});
    this.props.history.push("/home")
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MicrosoftLogin clientId={process.env.REACT_APP_CLIENT_ID} authCallback={this.authHandler.bind(this)} />
        </header>
      </div>
    );
  }
}

export default Login;