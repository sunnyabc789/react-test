import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'

// 上面的方式都会将组件中全部的数据暴露出去,有时候我们想只想暴露出一部分数据


function Child(props, parentRef) {
  const inputRef = useRef();
  useImperativeHandle(parentRef, () => {
    // return返回的值就可以被父组件获取到,没返回的值就获取不到
    return {
      focus() {
        inputRef.current.focus();
      }
    }
  })
  return (
    <>
      <p>{props.name}</p>
      <input type="text" ref={inputRef} />
    </>
  )
}

export default ForwardChidl = forwardRef(Child);
