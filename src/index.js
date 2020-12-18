import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

import authReducer from './store/reducers/auth'

import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

export const BASE_URL = 'http://localhost:5000/api/';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});


const rootReducer = combineReducers({
  auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
