import React from 'react'


function HOC(Component) {

  class ConfigedComponent extends React.Component {

    render() {
      return <Component
      >
        {this.props.children}
        </Component>
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
// const Loading = Loading1

 class App extends React.Component { 

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
      return <LoadingComponent >{content}</LoadingComponent>;
    }
    return content
  }
}

function ABC(WrappedComponent) {
  class PreTable extends React.Component {
    render() {
        const { loadingComponent, loading, ...others } = this.props;
        const LComponent = loadingComponent || Loading;
        if (loading) {
            return (
                <LComponent >
                    <WrappedComponent {...others} />
                </LComponent>
            );
        } else {
            return <WrappedComponent {...others} />;
        }
    }
}

  return PreTable;
}

// export default ABC(App)
export default App