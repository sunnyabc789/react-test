import React  from 'react'
import Abc from './Abc.jsx'



class Test extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            list: [ { id:1 , name: 'xixi' } ,{ id:2 , name: 'haha' },{ id:3 , name: 'heihei' } ],
            number:1
         }
    }
    render(){
       const { number, show  } = this.state
       return <div style={{ marginTop:'50px' }} >
           <input placeholder="表单"  />
           <br />
           <textarea placeholder="文本域" />
           <br />
            {new Array(number).fill(0).map(()=> <span>{'🌟'}</span>)}
         <br />
           <button onClick={()=>{  this.setState({ number : number + 1 })  }} >🌟++</button>
           <button onClick={()=>{  this.setState({ number : number - 1 })  }} >🌟--</button>
          <Abc />
       </div>
    }
}



export default Test