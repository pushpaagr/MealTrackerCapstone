import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Recipes from './Recipes';
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
      query: "",
      user: null,

    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        // console.log(this.state.user.uid);
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
      });

    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    })


  };


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

          </nav>
          <Recipes
            recipeList={this.state.result}
            useruid={this.state.user ? this.state.user.uid : null
            }
            />

        </div>
      </div>
    )
  }


}

export default Dashboard;
