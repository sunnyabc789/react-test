import React, { forwardRef } from 'react'

function Child(props, parentRef) {
  console.log(props);
  return (
    <div>
      <input type="text" ref={parentRef} />
    </div>
  )
}
/**
 * 使用forwardRef将ref直接传递进去
 */
export default forwardRef(Child);

