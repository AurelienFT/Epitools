import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

function responseGoogle(response) {
  console.log(response)
}

function App() {
  console.log(process.env.REACT_APP_CLIENT_ID)
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

export default App;
