import React from 'react'
import HandlerBox from './middle'

export default class App extends React.Component { 

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  
  render() {
    return <HandlerBox 
      
    />
  }
}