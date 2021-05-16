import React from 'react'
import Bar from '../Bar'
export default class App extends React.Component { 
  state = {
    doMeasure: false,
    test: false
  }

  render() {
    return <div onClick={() => this.setState({doMeasure: !this.state.doMeasure})}>
      <Bar test={this.state.test} doMeasure={this.state.doMeasure}></Bar>
      <button onClick={() => {this.setState({test: !this.state.test})}}>button</button>
    </div>
  }
}