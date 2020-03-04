import React from 'react'
import { GoogleLogin } from 'react-google-login';

function responseGoogle(response) {
  console.log(response)
}

class Login extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            scope={'profile email https://www.googleapis.com/auth/calendar'}
          />
        </header>
      </div>
    );
  }
}

export default Login;