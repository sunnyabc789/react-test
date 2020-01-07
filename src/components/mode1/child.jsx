import React from 'react'

export default class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '哈哈'
    }
    this.inputRef = React.createRef();
  }
  render() {
    return (
      <input type="text" value={this.state.name} onChange={(e) => this.setState(e.target.value)} ref={this.inputRef} />
    )
  }
}
