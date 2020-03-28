import React from 'react'

export default class Test extends React.Component {
  componentDidMount() {
      document.querySelector('#btn').addEventListener('click', (e) => {
          console.log('A inner listener')
          setTimeout(() => {
              console.log('B inner listener timer', e.type)
          })
      })

      document.body.addEventListener('click', (e) => {
          console.log('C document listener')
      })

      window.addEventListener('click', (e) => {
          console.log('D window listener')
      })
  }

  outClick(e) {
      setTimeout(() => {
          console.log('E out timer', e.type)
      })
      console.log('F out e', e.type)
  }

  innerClick (e)  {
      console.log('G inner e')
      e.stopPropagation()
  }

  render() {
      return (
          <div onClick={this.outClick}>
              <button id="btn" onClick={this.innerClick}>点我</button>
          </div>
      )

  }
}