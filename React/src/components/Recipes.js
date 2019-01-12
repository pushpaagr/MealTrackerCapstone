import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import PropTypes from 'prop-types';



class Recipes extends Component {

  render() {


console.log(this.props.searchbool);

    const RecipeList = this.props.recipeList.map((recipe, i) => {
      const detailrecipe = this.props.searchbool ?   recipe.recipe : recipe
      return (<Recipe
        key={i}
        useruid={this.props.useruid}
        recipeDetailCallback={() => this.props.recipeDetailCallback(detailrecipe)}
        {...detailrecipe}
        searchbool={this.props.searchbool}
        />);
      });

      return(
        <div>
          <div className="recipe-container">
            {RecipeList}
          </div>
        </div>
      )
    }

  }

  export default Recipes;
