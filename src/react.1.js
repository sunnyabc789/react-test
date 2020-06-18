import { UpdateQueue, Update } from "./updateQueue";

function createElement(type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map(i => {
        typeof i === 'object' ? i : {
          type: '',
          props: {
            text: i,
            children: []
          }
        }
      })
    }
  }
}

class Component {
  constructor(props) {
    this.props = props
  }
  setState(payload) {
    this.internalFiber.updateQueue.enqueueUpdate(new Update(payload))
  }
}
const React = {
  createElement,
  Component
}

export default React