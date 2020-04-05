import React, { useState, useEffect, Children  } from "react";
import { useFilter, generateItems, layoutOptions } from "../rm/utils.js";
import Muuri from 'muuri'

function getItemsOwner(grid) {
  const key = Object.keys(grid).find(key =>
    key.startsWith("__reactInternalInstance$")
  );

  return grid[key];
}

function getStateNodes(itemsOwner, indices) {
  let stateNodes = [];
  let child = itemsOwner.child;

  for (let index of indices) {
    while (child.index !== index) child = child.sibling;
    stateNodes.push(getStateNode(child));
  }

  return stateNodes;
}

function getStateNode(child) {
  child = child.child.child;
  while (!child.stateNode) child = child.child;
  return child.stateNode;
}


function getIndicesToAdd(newChildren, oldChildren) {
  let indicesToAdd = [],
    oIndex = 0;

  for (let nIndex = 0; nIndex < newChildren.length; nIndex++) {
    const index = findIndex(newChildren[nIndex], oldChildren, oIndex);
    if (index === -1) {
      indicesToAdd.push(nIndex);
    } else {
      oIndex = index;
    }
  }

  return indicesToAdd;
}

function findIndex(child, children, fromIndex) {
  fromIndex = fromIndex > children.length ? children.length : fromIndex;

  for (let index = fromIndex; index < children.length; index++) {
    if (is(child, children[index])) return index;
  }

  for (let index = 0; index < fromIndex; index++) {
    if (is(child, children[index])) return index;
  }

  return -1;
}

function addItems(
  muuri,
  addedDOMItems,
  indicesToAdd,
  addOptions,
  filter
) {
  for (let i = 0; i < addedDOMItems.length; i++) {
    // Add the items.
    muuri.add(addedDOMItems[i], { index: indicesToAdd[i], layout: false });
  }

  // Show the added items (usefull just if the items are
  // hidden by default and the filter is not setted).
  if (!filter && addOptions.show) muuri.show(indicesToAdd, { layout: false });
}

const _requests = []
function emit(items) {
  for (let i = 0; i < _requests.length; i++) {
    _requests[i](items[i]);
  }
}

function decorateItem(item) {
  /**
    props,
    data,
    key,
    fiber,
    eventController,
    dragWidth,
    dragHeight,
    draggable
   */
  item._component = {};
  item.getProps = function getProps() {
    return this._component.props || {};
  };
  item.getData = function getData() {
    return this._component.data || {};
  };
  item.setData = function setData(data) {
    item._component.data = Object.assign(this._component.data || {}, data);
  };
  item.deleteData = function deleteData() {
    this._component.data = {};
  };

  // Change the sort data.
  Object.defineProperty(item, "_sortData", {
    get() {
      return this.getData();
    },
    set() {
      // nothing to do here.
    }
  });
}

function decorateDOMItem(DOMItem) {
  DOMItem.style.position = "absolute";
}


_requests.push(item => {
  decorateItem(item);
  decorateDOMItem(item.getElement());
  // value.itemRefController.setItem(item);
})

export default function TestMuuri() {

  const [grid, setGrid] = useState(null)
  const [items, setItems] = useState(generateItems());

  // Children.
  const children = items.map(({ id, color, title, width, height }) => (
    <Item
      key={id}
      color={color}
      title={title}
      width={width}
      height={height}
    />
  ));

  const vars = {
    grid: null
  }

  useEffect(() => {

    let grid = new Muuri('.muuri-grid', {
      dragEnabled: true,
      dragContainer: document.getElementById('applications-management-layout'),
      dragSort: true,
      dragPlaceholder: {
        enabled: true,
        duration: 400
      },
      // dragStartPredicate: (item, e) => canOrderRef.current
    }).on('dragReleaseEnd', () => {
      let currentTag
      let orders = grid._items.map(i => {
        const [selectedTag, id] = i._element.id.split('|')
        currentTag = selectedTag
        return id
      })
      // dragEndHook('application-management/changeEditingOrderAppMap', {
      //   [currentTag]: orders
      // })
    })
    setGrid(grid)
  }, [])

  useEffect(() => {
    if (!grid) return
    //diff 找出需要插入的index
    vars.indicesToAdd = getIndicesToAdd(children, []);
    let itemsOwner = getItemsOwner(vars.grid)
    vars.addedDOMItems = getStateNodes(itemsOwner, vars.indicesToAdd);

    addItems(grid, vars.addedDOMItems, vars.indicesToAdd, { show: true }, () => {});
    // New Items.
    const addedItems = grid.getItems(vars.indicesToAdd);
    // Emit the new items to the itemComponents.
    emit(addedItems);
  }, [items, grid])
  // useEffect(() => {
  //   if (!grid) return
  //   // var elements = createItemElements(apps);
  //   // elements.forEach(function(el) {
  //   //   el.style.display = 'none';
  //   // });
  //   grid.add(children[0]);
  //   // grid.show(elements);
  // }, [grid, items])


  return (
    <div id="applications-management-layout" style={{ width: '1000px', height: '1000px' }}>
      <div style={{ width: '1000px', height: '1000px' }} ref={grid => (vars.grid = grid)} className="muuri-grid">
        {children}
      </div>
    </div>
  )
}

// Item component.
const Item = ({ color, width, height, title, remove }) => {
  return (
    <div className={`item h${height} w${width} ${color}`}>
      <div className="item-content">
        <div className="card">
          <div className="card-title">{title}</div>
          <div className="card-remove">
            <i className="material-icons" onMouseDown={remove}>
              &#xE5CD;
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};