import React from 'react'
import MicrosoftLogin from "react-microsoft-login";

function authHandler(err, data) {
  console.log(data)
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