import { useState } from 'react'

export default function Abc(){
  const [show, setShow] = useState(true)
  return (
    <div>
      <button onClick={() => setShow(!show)}>show</button>
      {
        show ? 'test' : null
      }
    </div>
  )
} 