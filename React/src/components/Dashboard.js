import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Recipes from './Recipes';


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      LoginStatus: false,
      result: [],
      query: "",
    }
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
          </nav>

          <Recipes
            recipeList={this.state.result}
            />

        </div>
      </div>
    )
  }


}

export default Dashboard;
