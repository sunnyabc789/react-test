import { render } from 'react-dom'
import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

const rootElement = document.getElementById('container')

const tabs = [
  { title: 'First Tab' },
  { title: 'Second Tab' },
  { title: 'Third Tab' },
];

class App extends React.Component {

  render() {

    //antd-mobile Tabs有大坑  需要 
    //1..am-tabs-tab-bar-wrap
    //height 47px !important
    //2. 行内 height:250px
    return (
      <div>
        <WhiteSpace />
        <div style={{ height: 200 }}>
          <Tabs 
            tabs={tabs}
            initialPage={'t2'}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
              Content of first tab
        </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
              Content of second tab
        </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
              Content of third tab
        </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

render (
  <App />,
  rootElement
)