import React from 'react'
import MicrosoftLogin from "react-microsoft-login";
import { loginUserMicrosoft } from "../../API/API"
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
  console.log(result)
}
class Login extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MicrosoftLogin clientId={process.env.REACT_APP_CLIENT_ID} authCallback={authHandler} />
        </header>
      </div>
    );
  }
}

export default Login;