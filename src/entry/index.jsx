
import React from 'react';
import ReactDOM from 'react-dom';
import '../common/init.css'

import Sample from '../pages/top-middle/wrong2/index.jsx'

class App extends React.Component { 
  render() {
    return <Sample />
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
          