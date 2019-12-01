import _ from 'lodash'

/** 底划线节点 */
export default (joint, graph, paper, {position, size, node}) => {
  joint.shapes.underlineNode = {}
  joint.shapes.underlineNode.Element = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
      type: 'underlineNode.Element',
      attrs: {
        rect: { stroke: 'none', 'fill-opacity': 0 }
      },
      ports: {
        groups: {
          'in': {
            position: {
              name: 'absolute',
              args: {
                y: '100%'
              }
            }
          },
          'out': {
            position: {
              name: 'absolute',
              args: {
                x: '100%',
                y: 40
              }
            }
          }
        }
      }
    }, joint.shapes.basic.Rect.prototype.defaults)
  })

  joint.shapes.underlineNode.ElementView = joint.dia.ElementView.extend({
    template: [
      '<div class="expand-underline-node-text">',
      '</div>'
    ].join(''),

    initialize: function () {
      alert("This is the View.");
    },
    init: function() {
      // Update the box position whenever the underlying model changes.
      this.listenTo(this.model, 'change', this.updateBox)
    },

    onBoxChange: function(evt) {
    },

    onRender: function() {
      if (this.$box) this.$box.remove()
      var boxMarkup = joint.util.template(this.template)()
      var $box = this.$box = $(boxMarkup)
      this.$attributes = $box.find('[data-attribute]')
      // React on all box changes. e.g. input change
      $box.on('change', this.onBoxChange.bind(this))
      $box.on('click', function (e) {
        console.log('啊哈哈')
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
        if (_.get(value, 'text', '')) {
          this.$box.text(_.get(value, 'text', ''))
        }
        this.$box.css(_.get(value, 'css', {}))
      })
      this.updateAttributes()
    },
    updateAttributes: function() {
      var model = this.model
      this.$attributes.each(function () {
        var value = model.get(this.dataset.attribute)
        switch (this.tagName.toUpperCase()) {
          case 'LABEL':
            this.textContent = value
            break
        }
      })
    },
    onRemove: function() {
      this.$box.remove()
    }
  })
  const underlineNode = new joint.shapes.underlineNode.Element({
    position,
    size,
    id: node.key,
    attrs: {
      '.expand-underline-node-text': {
        text: node.title
      }
    }
  })

if (!_.isEmpty(node.children)) {
  underlineNode.addPort({
    group: 'out', id: node.key + 'out',
    markup: '<rect width="20" height="20" fill="#0194E2" event="element:toggleNodeExpand:pointerdown"/>'
  })
}

  underlineNode.resize(size.width, 50)
  underlineNode.position(position.x, position.y - 21)

  return underlineNode
}
