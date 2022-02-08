import React from 'react'


function HOC(Component) {

  class ConfigedComponent extends React.Component {

    render() {
      const content = (
        <Component
            children={this.props.children}
            // {...newContextProps}
            // ref={obj.isClassComponent(Component) ? this._getInstance : null}
        />
    );
    return content
    }
  }

  return ConfigedComponent
}

class Loading1 extends React.Component { 
  render() {
    return (
      <div>
        loading
        {this.props.children}
      </div>
    )
  }
}

const Loading = HOC(Loading1)

export default class App extends React.Component { 

  constructor() {
    super() 
    this.tableEl = {}
  }

  getTableEl = ref => {
    this.tableEl = ref;
  };

  renderTable(groupChildren, flatChildren) {
    return (
        <div  tableEl={this.tableEl}>tset</div>
    )
  }

  render() {
    const { loading,   loadingComponent: LoadingComponent = Loading, } = this.props 

    let table = this.renderTable()
    const content = (
      <div
        ref={this.getTableEl}
      >
        <div>{table}</div>
      </div>
    );
    if (loading) {
      // const loadingClassName = `${prefix}table-loading`;
      return <LoadingComponent >{content}</LoadingComponent>;
    }
    return content
  }
}