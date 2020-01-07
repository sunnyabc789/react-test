import Child from './child'
import React, { Component } from 'react'

export default class UserRef1 extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  focus = () => {
    console.log(this.child.current.inputRef.current.value);
    this.child.current.inputRef.current.focus();
  }
  render() {
    return (
      <div>
        <Child ref={this.child} />
        <button onClick={this.focus}>获取焦点</button>
      </div>
    )
  }
}
