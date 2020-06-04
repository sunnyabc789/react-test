import React from 'react'

export default class App extends React.Component { 

  tFun = () => {
    console.log(this.props.setting, '2===')
    return <div>test2</div>
  }
  render() {
    console.log(this.props.setting, '1===')
    return (
      <div>test
        {  this.tFun()}
      </div>
    )
  }
}