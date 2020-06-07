import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST, PLACEMENT } from "./constants";
import { setProps } from './utils';

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
  let returnFiber = currentFiber.return

  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if (!!currentFiber.lastEffect) {
      if (!!returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      }

      // 这句没理解 且必不可少
      returnFiber.lastEffect = currentFiber.lastEffect
    }
    // 上面的整个没理解 因为当前还没有缺少effectTag的情况 
    let effectTag = currentFiber.effectTag
    if (effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }

}

function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  }
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateHostText(currentFiber) {
  currentFiber.stateNode = createDOM(currentFiber)
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
    return stateNode
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps);
}

function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildrenIdx = 0
  let preSibling
  while (newChildrenIdx < newChildren.length) {
    let newChild = newChildren[newChildrenIdx]

    let tag
    if (newChild.type === ELEMENT_TEXT ) {
      tag = TAG_TEXT
    } else if (typeof newChild.type === 'string'){
      tag = TAG_HOST
    }
    let newFiber = {
      tag,
      return: currentFiber,
      props: newChild.props,
      type: newChild.type,
      stateNode: null,
      effectTag: PLACEMENT,
      nextEffect: null
    }

    if (newFiber) {
      if (newChildrenIdx === 0) {
        currentFiber.child = newFiber
      } else {
        preSibling.sibling = newFiber
      }
      preSibling = newFiber
    }
    newChildrenIdx ++ 
  }
}



function workLoop(deadline) {
  let shouldYield = null
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && workInProgressRoot) {
    // commitRoot()
  }
  requestIdleCallback(workLoop, { timeout: 500 })
}

requestIdleCallback(workLoop, { timeout: 500 })