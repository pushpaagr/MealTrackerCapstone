import React, { Component } from 'react';


class Myrecipe extends Component {

  render() {


    const ingredients = this.props.ingredients.map((item, i) => {
      return (
        item.text
      )
    })

    const healthlabel = this.props.healthLables.map((item, i) => {
      return(item)
    })

    return (
      <div className="recipe-container">
        <div className="item-list_container">
          <h4>{this.props.label}</h4>
          <img src={this.props.image} alt='' />
          <div>
            {ingredients}
          </div>
          <div>{healthlabel}</div>
          <div>
            {this.props.recipeurl}
          </div>
        </div>
      </div>
    )
  }

}

export default Myrecipe;
