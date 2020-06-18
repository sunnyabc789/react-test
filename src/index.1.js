import React from './react';
import ReactDOM from './react-dom';
class ClassCounter extends React.Component {
  constructor() {
    this.state = { counter: 1 }
  }
  
}
ReactDOM.render(
  <ClassCounter />,
  document.getElementById('root')
);
