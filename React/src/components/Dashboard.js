import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Recipes from './Recipes';
import Myrecipes from './Myrecipes';

import firebase, { auth, provider } from '../firebase.js';


class Dashboard extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line

    this.state = {
      message: "",
      LoginStatus: false,
      result: [],
      myrecipes: [],
      query: "",
      user: null,

    }
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      query: '',
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
        myrecipes: []

      });

    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    })


  };

  // http://localhost:8080/myrecipes?useruid=tCWu4z6FqAMuu7B9eveTUOrsFF03

  myrecipes = () => {

    const url = `http://localhost:8080/myrecipes?useruid=${this.state.user.uid}`

    axios.get(url)
    .then((response) => {
      console.log(response.data);
      this.setState({
        myrecipes: response.data,
        result: []
      })
    })
    .catch((error) => {
      this.setState({
        error
      });
    })

  }



  render() {
    return(
      <div>
        <div>
          <nav className="nav-list_container">
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
                <button onClick={this.myrecipes}>My Account</button>
                :
                <p></p>
              }
            </div>

          </nav>
          <Recipes
            recipeList={this.state.result}
            useruid={this.state.user ? this.state.user.uid : null
            }/>

          <Myrecipes
            myrecipes={this.state.myrecipes} />

        </div>
      </div>
    )
  }


}

export default Dashboard;
