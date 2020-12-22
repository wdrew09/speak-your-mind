import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { axiosInstance } from './index';

import Navbar from "./Components/navBar"
import Login from "./Container/login";
import AccountView from "./Container/accountView";
import PostView from "./Container/postView";
import SignUp from "./Container/signUp";
import CreatePost from './Container/createPost';
import MessagePage from './Container/messagePage';

import { connect } from 'react-redux';

function App(props) {
  const [authorized, setAuthorized] = useState()


  useEffect(() => {
    if (props.token) {
      axiosInstance.get('account/verify?token=' + props.token)
        .then(response => {
          if (response.data.success) {
            setAuthorized(true)
          } else {
            console.log('not authorized')
            setAuthorized(false)
          }
        });
    } else {
      console.log('not authorized')
      setAuthorized(false)
    }
  }, [props.token])



  return (
    <Router>
      <div>
        {authorized ?
          <div>
            <Navbar />
            <br />
            <Switch>
              <Route path="/" exact ><MessagePage message={"You are already logged in!"}/></Route>
              <Route path="/posts" component={PostView} />
              <Route path="/account" component={AccountView} />
              <Route path="/sign-up" ><MessagePage message={"Please log out before creating a new account!"}/></Route>
              <Route path="/create-post" component={CreatePost} />
              <Route ><MessagePage message={"Page not found"}/></Route>
            </Switch>
          </div>
          :
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/posts" ><MessagePage message={"You are not authorized to use this page. Please login."}/></Route>
              <Route path="/account" ><MessagePage message={"You are not authorized to use this page. Please login."}/></Route>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/create-post" ><MessagePage message={"You are not authorized to use this page. Please login."}/></Route>
              <Route ><MessagePage message={"Page not found"}/></Route>
            </Switch>
          </div>
        }
      </div>

    </Router>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token
});


const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);