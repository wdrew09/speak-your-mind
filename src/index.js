import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './configureStore'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const BASE_URL = 'http://localhost:5000/api/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// const rootReducer = combineReducers({
//   auth: authReducer
// })

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    {/* <ToastContainer pauseOnFocusLoss={false} /> */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// reportWebVitals();
