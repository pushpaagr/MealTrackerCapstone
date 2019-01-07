import React from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";


const Recipe = (props) => {
  const {recipe} = props;
  console.log(props);
  return(
    <div className="recipe-container">
    <div className="item-list_container">

    <h4>{recipe.label}</h4>
  

    </div>
    </div>
  )
}

Recipe.propTypes = {
  label: PropTypes.string
};


export default Recipe;
