import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import axios from 'axios';



class Recipe extends Component {



  addRecipeActionCallback = () => {
    console.log(this.props.useruid);


    let id = this.props.recipe.uri
    id = encodeURIComponent(id);
    let url = `http://localhost:8080/addrecipe?id=${id}&useruid=${this.props.useruid}`

    axios.post(url)
    .then((response) => {
      console.log(response);
      // console.log(this.props.useruid);
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });
    console.log(url);
    console.log("inside function");
    console.log(this.props.recipe.uri);
    //axios
    //.then call another component
  };

  render () {

    const {recipe} = this.props;
    console.log(recipe);
    const ingredients = recipe.ingredients.map((item, i) => {
      return (
        item.text
      )
    })

    return(
      <div className="recipe-container">
      <div className="item-list_container">

      <h4>{recipe.label}</h4>
      <img src={recipe.image} alt='' />
      <div>
      {ingredients}
      </div>
      <div>
      {recipe.url}
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
