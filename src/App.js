import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
import Front from './Front'
import EventData from './EventData'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Result from './Result'

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Front} />
          <Route path="/data/:param" exact component={EventData} />
          <Route path="/result" exact component={Result} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
