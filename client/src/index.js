import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './configureStore'

import 'react-toastify/dist/ReactToastify.css';

// export const BASE_URL
let url = ''
if (process.env.NODE_ENV === 'production') {
  url = 'https://speak-your-mind.herokuapp.com/api/';
} else {
   url = 'http://localhost:5000/api/';
}
export const BASE_URL = url

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

