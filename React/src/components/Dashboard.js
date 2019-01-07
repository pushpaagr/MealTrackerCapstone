import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home';
import Recipes from './Recipes';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      LoginStatus: false,
      result: [],
      query: ""
    }
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.query);
  }
  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  render() {
    return(
      <Router>
        <div>

          <nav className="nav-list_container">
            <button className="dashboard-item">
              <Link to="/"  className="dashboard-link">Home</Link>
            </button>
            <form onSubmit={this.onFormSubmit}>
              <label>
                Search Recipes:
                <input type="text" value={this.state.query} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>

          </nav>
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    )
  }


}

export default Dashboard;
