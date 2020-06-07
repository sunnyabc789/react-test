import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST, PLACEMENT } from "./constants";
import { setProps } from './utils'

let nextUnitOfWork = null
let workInProgressRoot = null
export function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = rootFiber;
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }

  //到c1就没有child了 就开始这里了
  while (currentFiber) {
    completeUnitOfWork(currentFiber)

    if (currentFiber.sibling) {//看有没有弟弟
      return currentFiber.sibling;//有弟弟返回弟弟
    }
    currentFiber = currentFiber.return
  }
}

function completeUnitOfWork(currentFiber) {//第一个完成的A1(TEXT)
  let returnFiber = currentFiber.return;//A1
  if (returnFiber) {
      ////这一段是把自己儿子的effect 链挂到父亲身上
      if (!returnFiber.firstEffect) {
          returnFiber.firstEffect = currentFiber.firstEffect;
      }
      if (currentFiber.lastEffect) {
          if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
          }
          returnFiber.lastEffect = currentFiber.lastEffect;
      }
      //把自己挂到父亲 身上
      const effectTag = currentFiber.effectTag;
      if (effectTag) {// 自己有副作用 A1 first last=A1(Text)
          if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = currentFiber;
          } else {
              returnFiber.firstEffect = currentFiber;
          }
          returnFiber.lastEffect = currentFiber;
      }
  }
}

function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }

  let newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}

//新建文本节点或一般节点 一般节点则需要修饰一下
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
  setProps(stateNode, oldProps, newProps)
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0;
  let prevSibling 

  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]
    let tag
    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST
    }

    let newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null,
      return: currentFiber,
      nextEffect: null,
      effectTag: PLACEMENT
    }

    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling  = newFiber
      }
      // 此处fiber给了邻居指针 下一次到上面那句 就给加了个sibling属性
      prevSibling = newFiber
    }
    newChildIndex ++
  }
}

function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  }
}

function workLoop(deadLine) {
  let shouldYield = null
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadLine.timeRemaining() < 1
  }

  if (!nextUnitOfWork && workInProgressRoot) {//如果时间片到期后还有任务没有完成，就需要请求浏览器再次调度
    // render阶段 就是生成fiber数据结构  该数据结构带有真实dom节点了
    // 然后自下而上的appendChild
    console.log('render阶段结束');
    commitRoot();
  }
  
  requestIdleCallback(workLoop, { timeout: 5000 })

 }

 function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
      console.log('commitRoot', currentFiber.type, currentFiber.props.id, currentFiber.props.text);
      commitWork(currentFiber);
      currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}
function commitWork(currentFiber) {
  if (!currentFiber) return;
  let returnFiber = currentFiber.return;
  let returnDOM = returnFiber.stateNode;
  if (currentFiber.effectTag === PLACEMENT) {
      returnDOM.appendChild(currentFiber.stateNode);
  }
  //currentFiber.effectTag = null;
}

requestIdleCallback(workLoop, { timeout: 5000 })