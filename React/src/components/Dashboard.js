import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Recipes from './Recipes';
// import Myrecipes from './Myrecipes';
import Details from './Details';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import firebase, { auth, provider } from '../firebase.js';


class Dashboard extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line

    this.state = {
      message: "",
      result: [],
      query: "",
      user: null,
      detailRecipe: "",
      searchbool: false,

    }
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      query: '',
      result: []
    });
    this.searchRecipes();
  }
  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });

      }
    });
  }

  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  searchRecipes = () => {
    const url = `http://localhost:8080/search?ingredients=${this.state.query}`
    axios.get(url)
    .then((response) => {
      this.setState({
        result: response.data.hits,
        searchbool: true,
      });
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    })


  };

  myrecipes = () => {
    const url = `http://localhost:8080/myrecipes?useruid=${this.state.user.uid}`
    axios.get(url)
    .then((response) => {
      this.setState({
        result: response.data,
        searchbool: false,

      })
    })
    .catch((error) => {
      this.setState({
        error
      });
    })
  }

  recipeDetail = (recipe) => {
    this.setState({
      detailRecipe: recipe,
      result: []
    })
    console.log(this.state.detailRecipe);
  }

  render() {
    return(
      <Router>
        <div>
          <div>
            <nav className="nav-list_container">
              <Link to="/"  className="dashboard-link">Home</Link>
              <form onSubmit={this.onFormSubmit}>
                <label>
                  Search Recipes:
                  <input type="text" value={this.state.query} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
              <div className="wrapper">
                {this.state.user ?
                  <button onClick={this.logout}>Log Out</button>
                  :
                  <button onClick={this.login}>Log In</button>
                }
              </div>
              <div>
                {this.state.user ?
                  <button onClick={this.myrecipes}><Link to="/myaccount/" className="dashboard-link">My Account
                  </Link></button>
                  :
                  <p></p>
                }
              </div>

            </nav>

            <Route path="/" exact component={Home} />

            <Recipes
              recipeList={this.state.result}
              useruid={this.state.user ? this.state.user.uid : null}
              recipeDetailCallback={(recipe) => this.recipeDetail(recipe)}
              searchbool={this.state.searchbool}
              />

            <Route path="/myaccount/" render={() => <Recipes
                recipeList={this.state.result} />} />

              <Details detailRecipe={this.state.detailRecipe}
                searchbool={this.state.searchbool}
                />

            </div>
          </div>
        </Router>
      )
    }


  }

  export default Dashboard;
