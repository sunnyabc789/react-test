import React, { useEffect } from 'react'

export default function Bar(props) {
  useEffect(() => {
    console.log('here===', props.doMeasure);
  }, [props.doMeasure, props.test])
  return <div>bar</div>
}