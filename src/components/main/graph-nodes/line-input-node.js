import _ from 'lodash'

/** 文本输入节点 */
export default (joint, graph, paper, {position, colIdx, size, node}) => {
  joint.shapes.lineInputNode = {}
  joint.shapes.lineInputNode.Element = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
      type: 'lineInputNode.Element',
      attrs: {
        rect: { stroke: 'none', 'fill-opacity': 0 }
      },
      ports: {
        groups: {
          'in': {
            attrs: {
              'body': {
                fill: '#0194E2',
                stroke: '#0194E2',
                'stroke-dasharray': '2',
                r: 0
              },
            }
          },
          'out': {
            position: 'right',
            attrs: {
              'body': {
                fill: '#0194E2',
                stroke: '#0194E2',
                'stroke-dasharray': '2',
                event: 'element:toggleNodeExpand:pointerdown'
              },
            }
          }
        }
      }
    }, joint.shapes.basic.Rect.prototype.defaults)
  })

  joint.shapes.lineInputNode.ElementView = joint.dia.ElementView.extend({

    template: [
      '<div class="expand-line-input-node-box">',
      '<div class="expand-line-input-node-box-label">权重系数</div>',
      '<div class="input-value"><li class="line-plus">+</li><input class="line-input" data-attribute="input-value" type="text"/><li class="line-subtract">-</li></div>',
      '</div>'
    ].join(''),

    init: function() {
      // Update the box position whenever the underlying model changes.
      this.listenTo(this.model, 'change', this.updateBox)
    },

    onBoxChange: function(evt) {
    },

    onRender: function() {
      if (this.$box) this.$box.remove()
      const boxMarkup = joint.util.template(this.template)()
      const $box = this.$box = $(boxMarkup)
      this.$attributes = $box.find('[data-attribute]')
      // React on all box changes. e.g. input change
      $box.on('change', this.onBoxChange.bind(this))
      // $box.on('click', function (e) {
      //   console.log('啊哈哈')
      // })

      let that = this
      $box.find('.line-input').on('input', _.debounce(function(e) {
        let value = e.target.value
        var node = that.model.get('node')
        if (!Number(value)) value = 0
        // PubSub.publish('index-relative-analytics-expect-diagram-change-predict-value', {node, value})
      }, 500))

      $box.find('.line-plus').on('click', function (e) {
        var node = that.model.get('node')
        let value = node.weight || 0
        // PubSub.publish('index-relative-analytics-expect-diagram-change-predict-value', {node, value: _.round(value + 0.1,2)})
      })

      $box.find('.line-subtract').on('click', function (e) {
        var node = that.model.get('node')
        let value = node.weight || 0
        // PubSub.publish('index-relative-analytics-expect-diagram-change-predict-value', {node, value: Math.max(_.round(value - 0.1,2), 0)})
      })

      // Update the box size and position whenever the paper transformation changes.
      // Note: there is no paper yet on `init` method.
      this.listenTo(this.paper, 'scale translate', this.updateBox)
      $box.appendTo(this.paper.el)
      this.updateBox()

      return this
    },
    updateBox: function() {
      // Set the position and the size of the box so that it covers the JointJS element
      // (taking the paper transformations into account).
      var bbox = this.getBBox({ useModelGeometry: true })

      var scale = paper.scale ? paper.scale() : {sx:1, sy:1}

      let attrs = this.model.get('attrs')
      attrs = _.omit(attrs, ['.', 'rect', 'text'])

      this.$box.css({
        transform: 'scale(' + scale.sx + ',' + scale.sy + ')',
        transformOrigin: '0 0',
        width: bbox.width / scale.sx,
        height: bbox.height / scale.sy,
        left: bbox.x,
        top: bbox.y
      })
      _.mapKeys(attrs, (value, key) => {
        if (_.get(value, 'text', '')) this.$box.find(key + '').text(_.get(value, 'text', ''))
        this.$box.find(key).css(_.get(value, 'css', {}))
      })

      var node = this.model.get('node')
      if (node.inputingWeight)  this.$box.find('input').focus()
      this.updateAttributes()
    },
    updateAttributes: function() {
      var model = this.model
      this.$attributes.each(function () {
        // var value = model.get(this.dataset.attribute)
        var value = model.attributes.attrs[this.dataset.attribute]
        switch (this.tagName.toUpperCase()) {
          case 'LABEL':
            this.textContent = value
            break
          case 'INPUT':
            if (!Number(value)) return this.value = 0
            this.value = value
            break
        }
      })
    },
    onRemove: function() {
      this.$box.remove()
    }
  })
  const lineInputNode = new joint.shapes.lineInputNode.Element({
    position,
    size,
    node,
    id: node.key,
    attrs: {
      'input-value': node.weight || 0
    }
  })

  if (colIdx !== 0) {
    lineInputNode.addPort({
      group: 'in',  id: node.key + 'in',
      markup: '<rect width="0" height="0"/>'
    })
  }
  if (!_.isEmpty(node.children)) {
    lineInputNode.addPort({
      group: 'out', id: node.key + 'out',
      markup: '<rect width="0" height="0"/>'
    })
  }
  // lineInputNode.resize(size.width, 50)
  return lineInputNode
}
