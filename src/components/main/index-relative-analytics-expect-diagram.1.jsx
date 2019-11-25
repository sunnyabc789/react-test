import React from 'react'
import 'jointjs/dist/joint.css'
import _ from 'lodash'
import {
  immutateUpdate,
  immutateUpdates,
  isDiffByPath,
  isDiffBySomePath,
  recurFlatten,
  recurMap
} from '../../../../common/sugo-utils'
import {Icon, Input, Select} from 'antd'
import {Button2} from '../../Common/sugo-icon'
import {extent, format} from 'd3'
import {withSizeProvider} from '../../Common/size-provider'
import liveScreenBgImgUrl from './imgs/bg1.png'
import { genExpandBox } from './genHtmlBox'
import { genExpandRectInputBox } from './genInputRectBox'
import genAlarmNode from './graph-nodes/alarm-node'
import genUnderlineNode from './graph-nodes/underline-node'
import genCirleNode from './graph-nodes/circle-node'
import genLineInputNode from './graph-nodes/line-input-node'
import PubSub from 'pubsub-js'

//重构方向 该数据结构虽然是树 但没有提供任何的树接口 需要将数据树转换为功能树 并提供丰富的操作接口 指针等
//如 前中后序遍历该树的方法 寻找节点方法 兄弟节点指针 父节点指针 优先重构 

// const {Option} = Select
const percentFormat = format('.0%')

const cellWidth = 200
const cellHeight = 60
const expandCellWidth = 250
const expandCellHeight = 230
const colWidth = 320

@withSizeProvider
export default class IndexRelativeAnalyticsExpectDiagram extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldUpdate: false
    }
  }

  componentDidMount() {
    let {disabled} = this.props
    let transform = _.get(this.props, 'value.transform') || {}
    let scale = _.get(this.props, 'value.scale')
    let graph = new joint.dia.Graph()

    let paper = new joint.dia.Paper({
      el: this.chartDom,
      model: graph,
      width: '100%',
      height: '100%',
      background: {
        image: liveScreenBgImgUrl,
        size: {
          width: '100%',
          height: '100%'
        }
      },
      interactive: false,
      gridSize: 10,
      drawGrid: false
    })

    paper.translate(transform.x, transform.y)
    paper.scale(scale || 1)

    this.graph = graph
    this.paper = paper

    this.genGraph(graph, paper)
    this.bindEvents()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (isDiffBySomePath(this.props, prevProps, 'value', 'selectedKey')) {
  //     let transform = _.get(this.props, 'value.transform') || {}
  //     let scale = _.get(this.props, 'value.scale')
  //     this.genGraph(this.graph, this.paper)
      
  //     this.paper.translate(transform.x || 0, transform.y || 0)
  //     this.paper.scale(scale || 1)
  //   }
  //   if (isDiffByPath(this.props, prevProps, 'disabled')) {
  //     this.paper.setInteractivity(!this.props.disabled)
  //   }
  //   if (isDiffBySomePath(this.props, prevProps, 'spWidth', 'spHeight')) {
  //     const {spHeight, spWidth} = this.props
  //     this.props.onChange(prev => {
  //       return {
  //         ...prev,
  //         transform: {x: spWidth * 0.2, y: spHeight / 2}
  //       }
  //     })
  //   }
  //   if (isDiffByPath(this.props, prevProps, 'value.expandedKeys'))  this.genGraph(this.graph, this.paper)


  //   this.genGraph(this.graph, this.paper)
  //   if (this.state.shouldUpdate) {
  //     this.genGraph(this.graph, this.paper)
  //     this.setState({
  //       shouldUpdate: false
  //     })
  //   }
  // }


  bindEvents = () => {
    this.paper
      .on('element:toggleNodeExpand:pointerdown', this.onToggleExpand)
      .on('cell:pointerup', this.onMouseUp)
      .on('blank:pointerdown', (ev, x, y) => {
        // x, y 为绝对位置
        this.dragCanvasAt = [x, y]
      })
      .on('blank:pointermove', (ev, x, y) => {
        if (this.dragCanvasAt) {
          // x, y 为绝对位置
          let [sx, sy] = this.dragCanvasAt
          let translate = this.paper.translate()
          const deltaX = x - sx
          const deltaY = y - sy
          this.paper.translate(translate.tx + deltaX, translate.ty + deltaY)
        }
      })
      .on('blank:pointerup', () => {
        let {onSelect, onChange, value} = this.props
        if (this.dragCanvasAt) {
          let translate = this.paper.translate()
          onChange(immutateUpdate(value, 'transform', () => ({x: translate.tx, y: translate.ty})))
          delete this.dragCanvasAt
        }
        if (onSelect) {
          onSelect(null)
        }
      })
  }

  syncPosition = (cell) => {
    let {value, onChange} = this.props
    const pos = cell.position()
    const res = immutateUpdate(value, 'tables', tables => {
      let table = _.find(tables, t => t.id === cell.id)
      if (!table) {
        return tables
      }
      return tables.map(t => t === table ? {...t, position: {x: pos.x, y: pos.y}} : t)
    })
    if (res === value) {
      return
    }
    onChange(res, value)
  }

  onMouseUp = (cellView, ev) => {
    const type = _.get(cellView.model, 'attributes.type')
    if (type === 'standard.HeaderedRectangle' || type === 'TableRect') {
      let {onSelect, spWidth, spHeight} = this.props
      // 更新坐标
      this.syncPosition(cellView.model)
      if (onSelect) {
        onSelect(cellView.model.id)
      }
      // 如果需要则扩大画布
      let currTranslate = this.paper.translate()
      let {y, height} = this.paper.getContentArea()
      const padding = 30
      this.paper.setDimensions(spWidth, Math.max(spHeight, currTranslate.ty + y + height + padding * 2))
    } else if (cellView.model.isLink()) {
      // 没有连到端点，则取消
      // const linkAttrs = cellView.model.attributes
      // if (!('id' in linkAttrs.target) || !('id' in linkAttrs.source)) {
      cellView.model.remove()
      // }
    }

    if (_.get(cellView, 'model.attributes.type') === "devs.Model") this.changeExpand(cellView, 'expandRect') 
    if (_.get(cellView, 'model.attributes.type') === "underlineNode.Element") this.changeExpand(cellView, 'expandRect') 
    if (_.get(cellView, 'model.attributes.type') === "standard.Rectangle") this.changeExpand(cellView, 'expandRect') 

    if (type === 'standard.Circle') {
      this.onToggleExpand(cellView, ev)
    }
  }

  changeInputValue(node, value) {
    value = Number(value)
    this.props.onChange((diagramInfo) => {
      return immutateUpdate(diagramInfo, 'tree', (trees) => {

        function recur(arr) {
          return arr.map( (i, idx) => {
            if (i.inputingPredictValue) delete i.inputingPredictValue
            if (i.inputingWeight) delete i.inputingWeight
            if (i._id === _.get(node, 'model.id') || i._id === _.get(node, '_id')) {
              if (i.expand === 'line-input-node') {
                i.inputingWeight = true
                i.weight = value
                i.children[0].weight = value
                if (diagramInfo.autoTrim) {
                  for (let j = 0; j < arr.length; j ++) {
                    if (idx !== j) {
                      arr[j].weight = _.round((1 - i.weight) / ((arr.length - 1) || 1), 2)
                    }
                  }
                }
              }
              else {
                i.inputingPredictValue = true
                i.predictValue = value
              }
            }
            if (i.children) i.children = recur(i.children)
            return i
          })
        }

        if (!trees[0].children) return trees
        let res = recur(trees)
        return res
      })
    })
    this.setState({
      shouldUpdate: true
    })
  }

  changeExpand(cellView, expand) {
    this.props.onChange((diagramInfo) => {
      let shouldExpandParent = false
      return immutateUpdate(diagramInfo, 'tree', (trees) => {
        function recur(arr, parent) {
          return arr.map( (i, idx) => {
            //该逻辑下 所有点都要判断 去把weight节点变回普通节点
            if (expand === 'expandRectInputToRect') {
              let targetId = _.get(cellView, 'model.id')
              if (!targetId) targetId = _.get(cellView, '_id')
              if (i._id === targetId + 'weight' && i.expand === 'line-input-node') {
                i.expand = 'expandRect'
                expand = 'expandRect'
                diagramInfo.expandedKeys.filter( i => i !== i.key + 'weight')
                i.predictValue = i.children[0].predictValue
                i.children = i.children[0].children
                i._id = i._id.replace('weight', '')
                i.key = i.key.replace('weight', '')
              }
            }

            //一般逻辑为找到目标点后处理
            if (i._id === _.get(cellView, 'model.id') || i._id === _.get(cellView, '_id')) {
              
              i.expand = expand

              if (expand === 'expandRectInput') {
                if (!cellView.level ) {
                  i.expand = 'expandRect'
                  return i
                }

                shouldExpandParent = i._id + 'weight'

                i.children = [_.cloneDeep(i)]
                i._id += 'weight'
                diagramInfo.expandedKeys.push(i.key + 'weight')
                i.key += 'weight'
                i.expand = 'line-input-node'
              }
              return i
            }
            if (i.children) i.children = recur(i.children, i)
            return i
          })
        }

        function inOrder(arr, parent, callback) {
          let shouldDo = false
          for (let i = 0; i < arr.length; i ++) {
            let item = arr[i]
            if (!item.numcount && ((item.children && diagramInfo.expandedKeys.includes(item.key)) || _.isEmpty(parent))) shouldDo = inOrder(item.children, item, callback)
            if (shouldDo) return callback(item, parent)
            shouldDo = callback(item, parent)
            if (shouldDo) return shouldDo
          }
          return shouldDo
        }

        
        if (!trees[0].children) return trees
        let res = recur(trees)

        if (shouldExpandParent) {
          inOrder(res, {},  (item, parent) => {
            if (item._id === shouldExpandParent) {
              if (parent.expand !== 'expandRect' || parent.expand !== 'expandRectInput') {
                parent.expand = 'expandRect'
              }
              shouldExpandParent = parent._id
              return true
            }
            return false
          })
        }
        return res
      })
    })
    this.setState({
      shouldUpdate: true
    })
  }

  onToggleExpand = (elementView, evt) => {
    evt.stopPropagation() // stop any further actions with the element view (e.g. dragging)
    evt.preventDefault()
    let key = elementView.model.id
    key = key.replace('numcount', '')

    let {value, onChange} = this.props
    onChange(immutateUpdate(value, 'expandedKeys', expandedKeys => {
      return _.includes(expandedKeys, key) ? expandedKeys.filter(k => k !== key) : [...expandedKeys, key]
    }))
  }

  postOrder(treeNode, expandedKeysSet, callback, childKey = 'children') {
    if (_.isEmpty(treeNode)) return
    for (let i = 0; i < treeNode.length; i ++) {
      let item = treeNode[i]
      if (!_.isEmpty(item[childKey]) || expandedKeysSet.has(item.key)) {
        this.postOrder(item[childKey], expandedKeysSet, callback)
      }
      callback(item, i)
    }
  }

  //leafCount在此处固定为总展开的最终节点数
  genCells(treeNodes, expandedKeysSet, leafCount, level = 0, paper, graph) {
    if (!treeNodes) {
      return []
    }
    // 2. 叶子：早就算了 y 值，非叶子： 居中
    return _.flatMap(treeNodes, (n, idx) => {
      n.level = level
      //没有子节点 或者 没有展开节点时
      if (_.isEmpty(n.children) || !expandedKeysSet.has(n.key)) {
        //该节点没展开的话值渲染一个矩形 不渲染子节点
        if (n.expand && !n.numcount) return genExpandRect(n, level, n.y, expandedKeysSet.has(n.key), paper, graph)

        //有子节点 但是没有展开 动态添加了统计节点 此处为渲染逻辑
        if (n.numcount) {
            let temp = _.cloneDeep(_.omit(n,['children', 'expand']))
            temp.key = temp.key + 'numcount'
            temp.title = n.children.length
            temp.expand = 'circle-node'
            temp = {
              ...temp,
              ...genNodeRectSize('circle-node')
            }
            return [
              genExpandRect(n, level, n.y, expandedKeysSet.has(n.key), paper, graph),
              genExpandRect(temp, level + 1, n.y, expandedKeysSet.has(n.key), paper, graph, n),
              genLinkCellWithoutVertices({source: n.key, target: temp.key})
            ]
        }
        return genRect(n, level, n.y, expandedKeysSet.has(n.key))

      }

      // //渲染当前节点的下一级子节点  d3 extent 获得最值
      // let [minLeafy, maxLeafy] = extent(recurFlatten(n.children), n => {
      //   if (_.isNumber(n.leafIdx)) return n.y
      // })
      // // 垂直居中算法  当前节点下所有子节点号的中位数 - 当前节点下一级节点数量 / 2
      // let midY = (minLeafy + maxLeafy) / 2

      // let midY
      // let preSibling = treeNodes[idx - 1]
      // if (preSibling && !_.isNaN(preSibling.y)) {
      //   let nextMidY = preSibling.y + preSibling.height + 40
      //   if (midY < nextMidY) midY = nextMidY
      // }
      
      // n.y = midY || n.y

      // if (_.get(n.children, 'length') === 1) {
      //   let { height: nextH } = n.children[0]
      //   let { height: nowH } = n
      //   if (nowH > nextH)  n.children[0].y = n.y + Math.abs(nextH - nowH)
      //   if (nowH < nextH)  n.children[0].y = n.y - Math.abs(nextH - nowH)
      // }

      let cell = genRect(n, level, n.y, expandedKeysSet.has(n.key))
      if (n.expand && !n.numcount) cell = genExpandRect(n, level, n.y, expandedKeysSet.has(n.key), paper, graph)
      return [
        cell,
        ...this.genCells(n.children, expandedKeysSet, leafCount, level + 1, paper, graph),
        ...n.children.map(c => {

          if (n.key.includes('weight')) {
            return genLinkCellWithoutVertices({source: n.key, target: c.key})
          }

          if (c.expand === 'numcount') {
            return genLinkCellWithoutVertices({source: n.key, target: c.key})
          }

          let sourceX = n.x
          let targetX = c.x
          let sourceHeight = n.height
          let targetHeight = c.height
          let sourceWidth = n.width
          let targetWidth = c.width

          return genLinkCell({source: n.key, target: c.key}, {sourceX, sourceY: n.y, targetX, targetY: c.y, sourceHeight, targetHeight, sourceWidth, targetWidth} )

        })
      ]
    })
  }

  genGraph = (graph, paper, props = this.props) => {
    let tree = _.get(props, 'value.tree') || []
    let expandedKeys = _.get(props, 'value.expandedKeys') || []
    let expandedKeysSet = new Set(expandedKeys)

    let ColHeightSet = []

    let leafIdx = 0
    function recurCountLeaf(treeNodes) {
      return treeNodes.reduce((acc, curr) => {
        return _.isEmpty(curr.children) || !expandedKeysSet.has(curr.key)
          ? acc + 1
          : acc + recurCountLeaf(curr.children)
      }, 0)
    }

    let treeWithLeafCount = recurMap(tree, n => expandedKeysSet.has(n.key) && _.findKey(n, _.isArray), (n, parents) => {
      //有子节点 但是没展开的 展开属性为数量节点
      delete n.y
      delete n.numcount
      n.x = 0
      if (!_.isEmpty(n.children) && !expandedKeysSet.has(n.key)) {
        n.numcount = true
      }
      if (!_.isEmpty(parents)) {
        let dx = 80
        n.weight =  _.isNumber(n.weight) ? Number(n.weight) : (1 / parents[parents.length - 1].children.length)
        n.x = parents[parents.length - 1].x + parents[parents.length - 1].width + dx
      }
      let result = {
        ...n,
        leafCount: recurCountLeaf([n]),
        ...genNodeRectSize(n.expand) // width height
      }
      if (_.isEmpty(n.children) || !expandedKeysSet.has(n.key)) {
        result.leafIdx = leafIdx ++
        result.y = 0
        if (ColHeightSet[result.leafIdx - 1]) {
          let preH = ColHeightSet[result.leafIdx - 1].height
          let preY = ColHeightSet[result.leafIdx - 1].y

          result.y = preY + preH + 40
        }
        ColHeightSet.push({height: result.height, y: result.y})
      }


      return result
    })

    this.postOrder(treeWithLeafCount, expandedKeysSet, (i) => {
      if (!i.children) return i

      if (!i.inputingPredictValue || i.expand !== 'expandRectInput') {
        i.predictValue = 0
        i.children.map( (j) => {
          let item = j
          let weight = _.isNumber(item.weight) ? item.weight : 1 / i.children.length 
          if (j.expand === 'line-input-node') item = j.children[0]
           i.predictValue = i.predictValue + (weight * (item.predictValue / item.actualValue || 1))
        })
  
        i.predictValue = (i.actualValue * Number(i.predictValue)).toFixed(2)
      }

      if (_.isNumber(i.y)) return i
      let firstChild = i.children[0]
      let lastChild = i.children[i.children.length - 1]
      let minLeafy = firstChild.y + (firstChild.height / 2)
      let maxLeafy = lastChild.y + (lastChild.height / 2)
      let midY = ((minLeafy + maxLeafy) / 2) - (i.height / 2)

      i.y = midY
      return i
      // let preSibling = treeNodes[idx - 1]
      // if (preSibling && !_.isNaN(preSibling.y)) {
      //   let nextMidY = preSibling.y + preSibling.height + 40
      //   if (midY < nextMidY) midY = nextMidY
      // }
      
    })

    let cells = this.genCells(treeWithLeafCount, expandedKeysSet, leafIdx, 0, paper, graph).filter(_.identity)
    graph.fromJSON({cells})
  }

  zoomIn = () => {
    let {value, onChange} = this.props
    onChange(immutateUpdate(value, 'scale', prev => Math.min((prev || 1) + 0.1, 2)))
  }

  zoomOut = () => {
    let {value, onChange} = this.props
    onChange(immutateUpdate(value, 'scale', prev => Math.max((prev || 1) - 0.1, 0.5)))
  }

  autoTrim = () => {
    let { value, onChange } = this.props
    const next = immutateUpdate(value,
      'autoTrim', prev => !prev)
    onChange(next)
  }

  foldAll = () => {
    let { value, onChange } = this.props
    const next = immutateUpdates(value,
      'transform', () => ({'x': 400, 'y': 300}),
      'expandedKeys', prev => [],
      'tree', prev => {
        prev[0].expand = ''
        return prev
      })
    onChange(next)
  }

  autoFit = () => {
    let {value, onChange, spWidth, spHeight} = this.props
    // 水平缩放，垂直方向显示滚动条
    let {width: contentWidth} = this.paper.getContentArea()
    let viewportUsage = contentWidth / (spWidth - 60 * 2)
    let sx = 1 < viewportUsage ? 1/viewportUsage : 1
    let sxInRange = _.clamp(sx, 0.5, 2)
    this.paper.scale(sxInRange)

    this.paper.fitToContent({
      padding: 60,
      allowNewOrigin: 'any',
      minWidth: this.chartDom.clientWidth,
      maxWidth: this.chartDom.clientWidth + 1,
      minHeight: spHeight
    })
    let currTranslate = this.paper.translate()

    const next = immutateUpdates(value,
      'transform', prev => ({...prev, x: currTranslate.tx, y: currTranslate.ty}),
      'scale', () => sxInRange)
    onChange(next)
  }

  render() {
    let {disabled} = this.props
    let scale = _.get(this.props, 'value.scale') || 1
    let autoTrim = _.get(this.props, 'value.autoTrim') 
    return (
      <React.Fragment>
        <div
          className="height-100"
          style={{
            overflow: 'hidden',
            cursor: disabled ? 'not-allowed' : undefined
          }}
        >
          <div
            style={{
              height: '100%',
              pointerEvents: disabled ? 'none' : undefined
            }}
            ref={ref => this.chartDom = ref}
          />
        </div>
        {disabled ? null : (
          <div className="absolute top0 pd1" style={{right: '18px'}}>
            <Input
              size="small"
              addonBefore={(
                <Icon
                  type="plus"
                  className="pointer"
                  onClick={this.zoomIn}
                  title="放大"
                />
              )}
              addonAfter={(
                <Icon
                  type="minus"
                  className="pointer"
                  onClick={this.zoomOut}
                  title="缩小"
                />
              )}
              value={percentFormat(scale)}
              readOnly
              style={{
                width: '120px',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '5px'
              }}
            />
            {/* <Button2
              size="small"
              icon="sugo-selection"
              onClick={this.autoFit}
              title="自动适配"
            /> */}
            <Button2
              size="small"
              className='mg1l'
              icon="sugo-sort"
              onClick={this.autoTrim}
              style={ autoTrim ? {
                borderColor: 'red',
                color: 'red'
              } : { borderColor: '#d9d9d9', color: 'rgba(0, 0, 0, 0.65)'}}
              title="权重系数自动配平"
            />
            <Button2
              size="small"
              className='mg1l'
              icon="sugo-invisible"
              onClick={this.foldAll}
              title="收起所有"
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

function genNodeRectSize(expand) {
  let result = {
    width: 200,
    height: 60
  }

  switch (expand) {
    case 'expandRect':
      result = {
        width: expandCellWidth,
        height: expandCellHeight
      }
      break
    case 'expandRectInput':
      result = {
        width: expandCellWidth,
        height: expandCellHeight
      }
      break
    case 'alarm-node':
      break
    case 'underline-node':
      result = {
        width: 150,
        height: 60
      }
      break
    case 'circle-node':
      result = {
        width: 24,
        height: 24
      }
      break
    case 'line-input-node':
      result = {
        width: 120,
        height: 45
      }
      break
  }
  return result
}

function genCircleNodePosition(node, preNode) {
  const { width: nowW, height: nowH } = genNodeRectSize('circle-node')

  const preW = preNode.width
  const preH = preNode.height
  const preX = preNode.x
  const preY = preNode.y
  let result = {
    x: preX + preW + nowW * 2, 
    y: preY + ((preH - nowH) / 2) - 28 
  }

  if (preNode.expand === 'underline-node') {
     result = {
      x: preX + preW + nowW * 2, 
      y: preY + ((preH - nowH) / 2) - 29
    }
  }
  return result
}

function genExpandRect(node, colIdx, Y, expanded, paper, graph, preNode = {}) {

  const nodeProps = {
    node,
    colIdx,
    position: {
      x: node.x,
      y: node.y
    },
    size: {
      width: node.width,
      height: node.height
    }
  }
  switch (node.expand) {
    case 'expandRect':
      return genExpandBox(joint, graph, paper, nodeProps)
    case 'expandRectInput':
      return genExpandRectInputBox(joint, graph, paper, nodeProps)
    case 'alarm-node':
      return genAlarmNode(joint, graph, paper, nodeProps)
    case 'underline-node':
      return genUnderlineNode(joint, graph, paper, nodeProps)
    case 'circle-node':
      nodeProps.position = genCircleNodePosition(node, preNode)
      return genCirleNode(joint, graph, paper, nodeProps)
    case 'line-input-node':
      return genLineInputNode(joint, graph, paper, nodeProps)
    default:
      return genRect(node, colIdx, Y)
  }
}

function genRect(node, colIdx, Y, expanded) {

  let rect = new joint.shapes.devs.Model({
    id: node.key,
    position: {
      x: node.x,
      y: node.y
    },
    size: {
      width: node.width,
      height: node.height
    },
    // inPorts: colIdx === 0 ? [] : ['in'],
    // outPorts: _.isEmpty(node.children) ? [] : ['out'],
    ports: {
      groups: {
        'in': {
          attrs: {
            '.port-body': {
              fill: '#0194E2',
              stroke: '#0194E2',
              'stroke-dasharray': '2',
              r: 0
            },
            '.port-label': {fill: 'transparent'}
          }
        },
        'out': {
          attrs: {
            '.port-body': {
              fill: '#0194E2',
              stroke: '#0194E2',
              'stroke-dasharray': '2',
              event: 'element:toggleNodeExpand:pointerdown'
            },
            '.port-label': {fill: 'transparent'}
          }
        }
      }
    },
    attrs: {
      '.label tspan:first':  {dy: node.height / 4},
      '.label tspan:last': undefined ,
      '.label': {
        text: node.title,
        fontSize: colIdx === 0 ? 16 : colIdx === 1 ? 16 : 14,
        // pointerEvents: 'none',
        fill: '#D7DFE2'
      },
      '.body': {
        fill: '#013A59', 
        // pointerEvents: 'none', 
        stroke: '#013A59', 
        rx: 10,
        ry: 10,
      },
      '.line': {
        'stroke-dasharray': '5',
        'stroke-width': '1',
        'stroke': '#5A9BD5',
        'd': `M 0 1 L ${cellWidth} 1`
      }
    }
  })

  if (colIdx !== 0) {
    rect.addPort({
      group: 'in',  id: node.key + 'in'
  })
  }
  if (!_.isEmpty(node.children)) {
    rect.addPort({
      group: 'out', id: node.key + 'out'
    })
  }

  return rect
}

function genLinkCellWithoutVertices(linkInfo) {
  let {source, target} = linkInfo
  let link = new joint.shapes.devs.Link({
    id: `${source}out-${target}in`,
    source: {
      id: source,
      port: source + 'out'
    },
    target: {
      id: target,
      port: target + 'in'
    },
    attrs: {
      '.connection': {
        stroke: '#0194E2'
      }
    }
  })

  // link.connector('rounded', {
  //   radius: 20
  // })
  return link
}

function genLinkCell(linkInfo, {sourceX, sourceY, targetX, targetY, targetHeight, sourceHeight, sourceWidth, targetWidth}) {
  let {source, target} = linkInfo

  let x = (sourceWidth + sourceX) + (targetX - (sourceX + sourceWidth)) / 2
  let link = new joint.shapes.devs.Link({
    id: `${source}-${target}`,
    source: {
      id: source,
      port: source + 'out'
    },
    target: {
      id: target,
      port: target + 'in'
    },
    vertices: [{x, y: sourceY + sourceHeight / 2 },{x, y: targetY + targetHeight / 2}],
    attrs: {
      '.connection': {
        stroke: '#0194E2'
      }
    }
  })

  // link.connector('rounded', {
  //   radius: 20
  // })
  return link
}


