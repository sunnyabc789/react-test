import React from 'react'
import Com from './index2'

export default class App extends React.Component { 

  constructor() {
    super() 
    this.state = {
      loading: false
    }
  }



  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            loading: !this.state.loading
          })
        }}>test</button>
        <Com loading={this.state.loading}></Com>
      </div>
    )
  }
}