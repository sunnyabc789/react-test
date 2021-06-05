import React  from 'react'
import Test from './Test'

import { connect } from 'react-redux'


class Index extends React.Component{
    constructor(prop){
      super(prop)
    }

    render(){
      return (
        <>
          <button onClick={() => {
            this.props.dispatch({
              type: 'index/updateName',
              payload: {
                name: this.props.name + 1
              }
            })
          }}>change</button>
          {this.props.name}
          <Test />
        </>
      )
    }
}



export default connect(state => {
  return state['index']
})(Index)