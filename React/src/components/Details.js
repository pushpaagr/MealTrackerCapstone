import React, { Component } from 'react';
import PropTypes from 'prop-types';
// healthLabels: array, image, ingredients: array, label, uri, calories

class Details extends Component {

  render() {

    if (this.props.detailRecipe) {
      console.log("in details component");
      console.log(this.props.detailRecipe);



      const ingredients = this.props.detailRecipe.ingredients.map((item, i) => {
        return (
          item.text
        )
      })

      console.log(this.props.detailRecipe);

      const healthLabels = this.props.detailRecipe.healthLabels.map((item, i) => {
        return (
          item
        )
      })

      return (
        <div>
          <ul>
            <li>{this.props.detailRecipe.label}</li>
            <li><img src={this.props.detailRecipe.image} alt=''/></li>
            <li>UrL: {this.props.detailRecipe.url}</li>
            <li>Ingredients: {ingredients ? ingredients : "None"}</li>
            <li>healthLabels: {healthLabels}</li>
          </ul>
        </div>
      )
    } else {
      return <div></div>;
      }
    }
  }

  export default Details;
