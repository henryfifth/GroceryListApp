import React, { Component } from 'react';

export default class ItemElement extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        hello
    </div>
    )
  }
}