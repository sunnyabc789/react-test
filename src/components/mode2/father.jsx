import ForwardChild from './child'
import React, { useRef } from 'react'
// 在函数组件中要获取子组件的数据,需要两步骤1.将ref传递到子组件中,2.需要使用forwardRef对子组件进行包装


export default () => {
  const parentRef = useRef();
  function focusHander() {
    console.log(parentRef);
    parentRef.current.focus();
    parentRef.current.value = '哈哈';
  }
  return (
    <div>
      <ForwardChild ref={parentRef} />
      <button onClick={focusHander}>获取焦点</button>
    </div>
  )
}
