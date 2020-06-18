import { UpdateQueue } from "./updateQueue";
import { deepEquals } from "./utils";


let workInProgressRoot = null
let nextUnitOfWork = null
let currentRoot = null
let deletions = []

export function scheduleRoot(rootFiber) {
  if (currentRoot && currentRoot.alternate) {
    workInProgressRoot = currentRoot.alternate
    workInProgressRoot.alternate = currentRoot
    if (rootFiber) {
      workInProgressRoot.props = rootFiber.props
    }
  } else if (currentRoot) {
    if (rootFiber) {
      rootFiber.alternate = currentRoot
      workInProgressRoot = rootFiber
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  } else {
    workInProgressRoot = rootFiber
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null
  nextUnitOfWork = workInProgressRoot
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }

  while(currentFiber) {
    completeUnitOfWork(currentFiber)
    if (currentFiber.sibling) {
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return
  }
}

function completeUnitOfWork(currentFiber) {
  let reutrnFiber = currentFiber.return

  if (reutrnFiber) {
    if (!reutrnFiber.firstFiber) {
      reutrnFiber.firstFiber = currentFiber.firstFiber
    }

    if (!!currentFiber.lastFiber) {
      if (!!reutrnFiber.lastFiber) {
        reutrnFiber.lastFiber.nextFiber = currentFiber.lastFiber
      }
      reutrnFiber.lastFiber = currentFiber.lastFiber
    }
  }

  let effectTag = currentFiber.effectTag
  if (effectTag) {
    if (reutrnFiber.lastFiber) {
      reutrnFiber.lastFiber.nextFiber = currentFiber
    } else {
      reutrnFiber.firstFiber = currentFiber
    }
    reutrnFiber.lastFiber = currentFiber
  }
}

function beginWork(currentFiber) {
  if (currentFiber.tag === 'TAG_ROOT') {
    updateRoot(currentFiber)
  } else if (currentFiber.tag === 'TAG_HOST') {
    updateHost()
  } else if (currentFiber.tag === 'TAG_TEXT') {
    updateHostText()
  } else if (currentFiber.tag === TAG_CLASS) {//如果是类组件
    updateClassComponent(currentFiber)
}
}

function updateClassComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = new currentFiber.type(currentFiber.props)
    currentFiber.stateNode.internalFiber = currentFiber
    currentFiber.updateQueue = new UpdateQueue()
  }

  //willmount()
  currentFiber.stateNode.state = currentFiber.updateQueue.forceQueue(currentFiber.stateNode.state)
  let newChildren = [currentFiber.stateNode.render()]
  reconcileChildren(currentFiber, newChildren)
  
}

function updateRoot(currentFiber) {
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateHost(currentFiber) {
  if (!currentFiber.stataNode) {
    currentFiber.stataNode = createDOM(currentFiber)
  }
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateHostText(currentFiber) {
  if (!currentFiber.stataNode) {
    currentFiber.stataNode = createDOM(currentFiber)
  }
}

function createDOM(currentFiber) {
  if (currentFiber.tag === 'TAG_TEXT') {
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === 'TAG_HOST') {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
    return stateNode
  }
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildIdx = 0
  let oldFiber = currentFiber.alternate && currentFiber.alternate.child
  
  if (oldFiber) oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null
  let prevSibling = ''
  while (newChildIdx < newChildren.length || oldFiber) {
    let tag 
    let newFiber
    const sameType = oldFiber && newChild && newChild.type === oldFiber.type
    let newChild = newChildren[newChildIdx]
    if (newChild.type === 'Element_text') {
      tag = 'TAG_TEXT'
    } else if (typeof newChild.type === 'string') {
      tag = 'TAG_HOST'
    } else if (typeof newChild.type === 'function' && newChild.type.prototype.isReactComponent) {
      tag = 'TAG_CLASS'
    }

    if (sameType) {
      let { children: oldChildren, ...oldProps } = oldFiber.props;
      let { children: newChildren, ...newProps } = newChild.props;
      newFiber = {
        props: newFiber.props,
        type: oldFiber.type,
        stateNode: oldFiber.stateNode,
        return: currentFiber,
        effectTag: deepEquals(oldProps, newProps) ? null : UPDATE,
        updateQueue: oldFiber.updateQueue || new UpdateQueue(),
        alternate: oldFiber,
        tag
      }
    } else {
      
      newFiber = {
        tag,
        props: newChild.props,
        type: newChild.type,
        stateNode: null,
        return: currentFiber,
        alternate,
        effectTag: PLACEMENT
      }
    }

    newFiber = {
      tag, 
      stateNode: null,
      props: newChild.props,
      type: newChild.type,
      nextEffect: null,
      effectTag: PLACEMENT,
      return: currentFiber
    }

    if (newFiber) {

      if (newChildIdx === 0) {
        currentFiber.child = newChild
      } else {
        prevSibling.sibling = newChild
      }
        prevSibling = newChild
    }
    newChildIdx ++
  }
}

function workLoop(timeout) {
  let shouldYield = false

  while (nextUnitOfWork && shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = timeout.timeRemaining() < 1
  }

  requestIdelCallback(workLoop, { timeout: 500 })
}

requestIdelCallback(workLoop, { timeout: 500 })