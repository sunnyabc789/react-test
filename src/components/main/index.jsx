import React from 'react'
import _ from 'lodash'
import { value } from './testValue'
import IndexRelativeAnalyticsExpectDiagram from './index-relative-analytics-expect-diagram'
import './style.styl'

export default class App extends React.Component { 

  state = {
    diagramInfo: {
      transform: value.transform,
      scale: 0.8,
      tree: value.tree,
      autoTrim: true,
      // expandedKeys: ["SI-18165678", 'SI-1816567weight', 'SI-1816567', 'SI-56414489']
      expandedKeys: ['SI-18165678', 'SI-1816567',  'SI-8465432', 'SI-181656']
    }
  }

  render() {
    const { diagramInfo } = this.state
    return (
      <div className="indices-relative-analytics-expect common-bg height-100 relative" style={{height: '300px', width: '100%', position:'relative'}}>
        <div 
          className="go-back pointer" 
          style={{height: '300px', width: '100%'}}
        >
          <div className="pd1t">指标分析</div>
        </div>
        <IndexRelativeAnalyticsExpectDiagram 
          value = {diagramInfo}
          onChange = {next => {
            this.setState({
              diagramInfo: _.isFunction(next) ? next(diagramInfo) : next
            })
          }}
        />
      </div>
    )
  }
}