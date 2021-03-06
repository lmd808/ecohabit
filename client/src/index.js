import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import Appbar from './Components/Appbar';
import Footer from './Components/Footer';

ReactDOM.render(
  <Router>
    <Appbar />
    <App />
    <Footer />
  </Router>,
  document.getElementById('root')
);
