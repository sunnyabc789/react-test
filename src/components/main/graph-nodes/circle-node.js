
/** 圆圈节点 */
export default (joint, graph, paper, {position, size, node}) => {
  let circleNode = new joint.shapes.standard.Circle({
    id: node.key,
    position,
    size
  })
  // console.log(position, 'circle-position===', size)
  circleNode.resize(size.width, 80)
  circleNode.attr({
    body: {
      fill: '#0194E2',
      fillOpacity: 0.5,
      stroke: '#0194E2', // 边框颜色
      strokeWidth: 1 // 边框宽度
    },
    label: {
      fontSize: 16,
      text: node.title,
      fill: '#BAC3C6'
    }
  })
  // circleNode.position(100, 30)
  return circleNode
}
