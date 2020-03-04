import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/routes/Login';
import Home from './components/routes/Home';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Login}/>
      <Route exact path='/home' component={Home}/>
    </Router>
  );
}

export default App;
