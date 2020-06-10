import { PLACEMENT } from "./constants";
import { setProps } from "./utils";


let workInProgressRoot = null
let nextUnitOfWork = null
export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber
  nextUnitOfWork = rootFiber
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

function beginWork(currentFiber) {
  if (currentFiber.tag === 'TAG_ROOT') {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === 'TAG_HOST') {
    updateHost(currentFiber)
  } else if (currentFiber.tag === 'TAG_TEXT') {
    updateHostText(currentFiber)
  }
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }

  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function createDOM(currentFiber) {
  if (currentFiber.tag === 'TAG_TEXT') {
    return document.createTextNode(currentFiber.props.text)
  }

  if (currentFiber.tag === 'TAG_HOST') {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps)
}

function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0
  let prevSibling

  while(newChildIndex < newChildIndex.length) {
    let newChild = newChildren[newChildIndex]
    let tag 
    if (newChild.type === 'Element_Text') {
      tag = 'TAG_TEXT'
    } else if (typeof newChild.type === 'string') {
      tag = 'TAG_HOST'
    }
    let newFiber = {
      props: newChild.props,
      return: currentFiber,
      tag,
      type: newChild.type,
      effectTag: PLACEMENT,
      nextEffect: null,
      stateNode
    }

    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    }
    newChildIndex ++
  }
}

function completeUnitOfWork(currentFiber) {
  let returnFiber = currentFiber.return
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }

    if (!!currentFiber.lastEffect) {
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }
      returnFiber.lastEffect = currentFiber.lastEffect
    }
  }
  let effectTag = currentFiber.effectTag
  if (effectTag) {
    if (returnFiber.lastEffect) {
      returnFiber.lastEffect.nextEffect = currentFiber
    } else {
      returnFiber.firstEffect = currentFiber
    }
    returnFiber.lastEffect = currentFiber;
  }
}


function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  requestIdelCallback(workLoop, { timeout: 500 })
}

requestIdelCallback(workLoop, { timeout: 500 })