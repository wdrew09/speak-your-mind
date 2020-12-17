import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./Components/navBar"
import Login from "./Components/login";
import AccountView from "./Components/accountView";
import PostView from "./Components/postView";
import SignUp from "./Components/signUp";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Login} />
        <Route path="/posts" component={PostView} />
        <Route path="/account" component={AccountView} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;