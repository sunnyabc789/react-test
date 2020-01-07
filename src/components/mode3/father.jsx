import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'

export default () => {
  const parentRef = useRef();

  const focusHandler = () => {
    parentRef.current.focus();
  }
  return (
    <>
      <ForwardChidl ref={parentRef} name={'你好'} />
      <button onClick={focusHandler}>获取焦点</button>
    </>
  )
}
