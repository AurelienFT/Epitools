import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

function responseGoogle(response) {
  console.log(response)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          clientId="589355162-su0mdr3b8abaj2fgvl6uebtbha07u6t3.apps.googleusercontent.com"
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
