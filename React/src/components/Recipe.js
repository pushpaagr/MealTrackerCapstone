import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import axios from 'axios';



class Recipe extends Component {

  addRecipeActionCallback = () => {
    let id = this.props.uri
    id = encodeURIComponent(id);
    let url = `http://localhost:8080/addrecipe?id=${id}&useruid=${this.props.useruid}`

    axios.post(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });

  };

  render () {
    return(
      <div className="item-list_container">
        <ul className="recipe-items">
          <li>{this.props.label}</li>
          <li><img src={this.props.image} alt=''/></li>

          <li>
            {this.props.searchbool ?
              <button
                onClick={this.addRecipeActionCallback}
                className="item__button">Add to Calendar</button> :
                <p></p> }
                </li>
                <li><button  onClick={() => this.props.recipeDetailCallback()}>Recipe Details </button></li>
              </ul>
            </div>
          )
        }

      }
      Recipe.propTypes = {
        label: PropTypes.string

      };


      export default Recipe;
