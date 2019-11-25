
/** 高亮节点 */
export default (joint, graph, paper, {position, size, node}) => {
  let alarmNode = new joint.shapes.standard.Rectangle({
    id: node.key,
    position,
    size
  })
  // console.log(position, 'alarmNode-position===', size)
  // rect.position(100, 30)
  alarmNode.resize(size.width, 50)
  alarmNode.attr({
    body: {
      fill: '#FFB642',
      rx: 1,
      ry: 1,
      stroke: '#FFB642',
      strokeWidth: 1
    },
    label: {
      fontSize: 16,
      text: node.title,
      fill: '#071723'
    }
  })
  return alarmNode
}
