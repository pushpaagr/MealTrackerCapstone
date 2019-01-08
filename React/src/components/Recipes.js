import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import PropTypes from 'prop-types';



class Recipes extends Component {



  render() {
    const RecipeList = this.props.recipeList.map((recipe, i) => {
      return (<Recipe
        key={i}
        {...recipe}
        />);
      });

      return(
        <div>
        <div>
        {RecipeList}
        </div>
        </div>
      )
    }

  }

  export default Recipes;
