

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
  }
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
  let prevSibling = ''
  while (newChildIdx < newChildren.length) {
    let tag 
    let newChild = newChildren[newChildIdx]
    if (newChild.type === 'Element_text') {
      tag = 'TAG_TEXT'
    } else if (typeof newChild.type === 'string') {
      tag = 'TAG_HOST'
    }

    let newFiber = {
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