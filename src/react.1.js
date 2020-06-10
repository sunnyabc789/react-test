
function createElement(type, config, ...children) {
  return {
    type,
    props: {
      ...config,
      children: children.map(i => {
        typeof i === 'object' ? i : {
          type: '',
          props: {
            text: i,
            children: []
          }
        }
      })
    }
  }
}