import { render } from 'react-dom'
import React from 'react'
import App from '../components/main/index'

const rootElement = document.getElementById('container')

render (
  <div><App /></div>,
  rootElement
)