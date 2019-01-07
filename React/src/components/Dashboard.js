import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home';
import axios from 'axios';
import Recipes from './Recipes';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      LoginStatus: false,
      result: []
    }
  }

  render() {
    return(
      <Router>
      <div>
      <nav className="nav-list_container">
      <button className="dashboard-item">
      <Link to="/"  className="dashboard-link">Home</Link>
      </button>
      <button className="dashboard-item">
      <Link to="/search/" className="dashboard-link">Search</Link>
      </button>
      </nav>


      <Route path="/" exact component={Home} />
      <Route path="/search/"
      render={() => <Recipes/>} />
      </div>
      </Router>
    )
  }


}

export default Dashboard;
