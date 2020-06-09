import { render } from 'react-dom'
import React from 'react'
import App from '../components/main'
import '../components/main/test.styl'

const rootElement = document.getElementById('container')

render (
  <App 
    setting={{
      test: 'abc'
    }}
  />,
  rootElement
)