
import React from 'react';
import ReactDOM from 'react-dom';
import TableTransferClass from './test.jsx'

class App extends React.Component { 
  render() {
    return <TableTransferClass />
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
          