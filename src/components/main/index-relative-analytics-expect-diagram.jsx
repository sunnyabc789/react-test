import React from 'react'
import 'jointjs/dist/joint.css'
import _ from 'lodash'
import genAlarmNode from './graph-nodes/alarm-node'
import genUnderlineNode from './graph-nodes/underline-node'
import genCirleNode from './graph-nodes/circle-node'
import genLineInputNode from './graph-nodes/line-input-node'
import * as joint from 'jointjs';

export default class IndexRelativeAnalyticsExpectDiagram extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let transform = _.get(this.props, 'value.transform') || {}
    let scale = _.get(this.props, 'value.scale')
    let graph = new joint.dia.Graph({},{
      cellNamespace: joint.shapes
    })

    let paper = new joint.dia.Paper({
      el: this.chartDom,
      model: graph,
      width: '100%',
      height: '100%',
      background: {
        size: {
          width: '100%',
          height: '100%'
        }
      },
      cellViewNamespace: joint.shapes,
      interactive: false,
      gridSize: 10,
      drawGrid: false
    })

    paper.translate(transform.x, transform.y)
    paper.scale(scale || 1)

    this.graph = graph
    this.paper = paper

    this.genGraph(graph, paper)
  }

  genCells(joint, graph, paper, {position, size, node}) {
    return [
      genExpandRect(joint, graph, paper, {position, size, node}),
    ]
  }

  genGraph = (graph, paper, props = this.props) => {
    let tree = _.get(props, 'value.tree') || []
    let expandedKeys = _.get(props, 'value.expandedKeys') || []
    let expandedKeysSet = new Set(expandedKeys)

    let cells = this.genCells(joint, graph, paper, {position: { x: 0, y: 0}, size: { width: 100, height: 100 }, node: { key: 'test', title: 'testabc', children: []}})
    graph.addCells([cells])
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            height: '100%',
            overflow: 'hidden',
            cursor: undefined
          }}
        >
          <div
            style={{
              height: '100%',
              pointerEvents: undefined
            }}
            ref={ref => this.chartDom = ref}
          />
        </div>
      </React.Fragment>
    )
  }
}


function genExpandRect(joint, graph, paper, {position, size, node}) {
  return genUnderlineNode(joint, graph, paper, {position, size, node})
}


