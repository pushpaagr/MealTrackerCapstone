import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import axios from 'axios';



class Recipe extends Component {

  addRecipeActionCallback = () => {
    let id = this.props.recipe.uri
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
    // console.log(this.props.recipe.ingredients);
    const ingredients = this.props.recipe.ingredients.map((item, i) => {
      return (
        item.text
      )
    })

    return(
      <div className="recipe-container">
      <div className="item-list_container">

      <h4>{this.props.recipe.label}</h4>
      <img src={this.props.recipe.image} alt='' />
      <div>
      {ingredients}
      </div>
      <div>
      {this.props.recipe.url}
      </div>
      <button
      onClick={this.addRecipeActionCallback}
      className="item__button">Add to Calendar</button>
      </div>
      </div>
    )
  }

}
Recipe.propTypes = {
  label: PropTypes.string

};


export default Recipe;
