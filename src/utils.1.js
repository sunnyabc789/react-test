
export function setProps(dom, oldProps, newProps) {
  for(let k in oldProps) {

  }

  for(let k in newProps) {
    if (k !== 'children') {
      setProp(dom, k, newProps[k])
    }
  }

}

export function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    dom[key.toLowerCase()] = value
  } else if (key === 'style') {
    if (value) {
      for (let k in value) {
        dom.style[k] = value[k]
      }
    }
  } else {
    dom.setAttribute(key, value)
  }
}