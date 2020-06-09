import React from 'react'

export default class App extends React.Component { 

  tFun = () => {
    console.log(this.props.setting, '2===')
    return <div  className="abc">test2</div>
  }
  render() {
    console.log(this.props.setting, '1===')
    return (
      <div id='test'>test
        {  this.tFun()}
        <div>abc</div>
      </div>
    )
  }
}