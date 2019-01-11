import React, { Component } from 'react';
import Myrecipe from './Myrecipe';
import PropTypes from 'prop-types';

class Myrecipes extends Component {

  render() {

    const RecipeList = this.props.myrecipes.map((recipe, i) => {
      return (<Myrecipe
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

  Myrecipes.propTypes = {
    myrecipes: PropTypes.array,

  };

  export default Myrecipes;
