import React, { Component } from 'react'

export default class Test extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  componentWillMount() {
    this.setState({
      count: 10
    })
  }
  render() {
    const { count } = this.state
    return (
      <div>
        {count}
      </div>
    )
  }
}
