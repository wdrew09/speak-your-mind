import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { axiosInstance } from './index';

import Navbar from "./Components/navBar"
import Login from "./Components/login";
import AccountView from "./Components/accountView";
import PostView from "./Components/postView";
import SignUp from "./Components/signUp";
import PageNotFound from './Components/pageNotFound';
import CreatePost from './Components/createPost';

import * as actionCreators from './store/actions/index';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const [authorized, setAuthorized] = useState()


  useEffect(() => {
    console.log(props.token)
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



  console.log(authorized)
  return (
    <Router>

      <div className="container">
        <Navbar />
        <br />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/posts" component={PostView} />
          <Route path="/account" component={AccountView} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/create-post" component={CreatePost} />
          <Route>{PageNotFound}</Route>
        </Switch>
      </div>
      {authorized === false && <Redirect to='/' component={Login} />}

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

// export default App;