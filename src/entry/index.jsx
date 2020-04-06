import { render } from 'react-dom'
import React from 'react'
import App from '../components/main/test-usecallback'

const rootElement = document.getElementById('container')

render (
  <App />,
  rootElement
)