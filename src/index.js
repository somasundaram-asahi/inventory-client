import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();
