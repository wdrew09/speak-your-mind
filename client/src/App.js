import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { axiosInstance } from './index';

import * as actionCreators from './store/actions/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Components/navBar"
import Login from "./Container/login";
import AccountView from "./Container/accountView";
import PostView from "./Container/postView";
import SignUp from "./Container/signUp";
import CreatePost from './Container/createPost';
import MessagePage from './Container/messagePage';

import { connect } from 'react-redux';

function App(props) {
  const [authorized, setAuthorized] = useState(true)


  useEffect(() => {
    if (props.token) {
      axiosInstance.get('account/verify?token=' + props.token)
        .then(response => {
          if (response.data.success) {
            setAuthorized(true)
          } else {
            setAuthorized(false)
          }
        });
    } else {
      setAuthorized(false)
    }
  }, [props.token])

  //Checks for updates on toast message, if so, displays them
  useEffect(() => {
    if (props.style === 'success') {
      toast.success(props.message)
    } else if (props.style === 'error') {
      toast.error(props.message)
    } else if (props.style === 'info') {
      toast.info(props.message)
    }
  }, [props.message, props.style])



  return (
    <Router>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {authorized ?
          <div>
            <Navbar />
            <br />
            <Switch>
              <Route path="/" exact ><MessagePage message={"You are already logged in!"} /></Route>
              <Route path="/posts" component={PostView} />
              <Route path="/account" component={AccountView} />
              <Route path="/sign-up" ><MessagePage message={"Please log out before creating a new account!"} /></Route>
              <Route path="/create-post" component={CreatePost} />
              <Route ><MessagePage message={"Page not found"} /></Route>
            </Switch>
          </div>
          :
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/posts" ><MessagePage message={"You are not authorized to use this page. Please login."} /></Route>
              <Route path="/account" ><MessagePage message={"You are not authorized to use this page. Please login."} /></Route>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/create-post" ><MessagePage message={"You are not authorized to use this page. Please login."} /></Route>
              <Route ><MessagePage message={"Page not found"} /></Route>
            </Switch>
          </div>
        }
      </div>

    </Router>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  message: state.alert.message,
  style: state.alert.style
});


const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);