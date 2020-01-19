
import React from 'react';
import ReactDOM from 'react-dom';
import Table from './table'

class App extends React.Component { 
  render() {
    return <Table />
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
          