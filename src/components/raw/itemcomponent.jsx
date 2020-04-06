
/* React */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
/* Context */
// import { ItemProvider } from "./itemContext";
/* Controllers */
import { EventController, ItemRefController } from "./controller.js";
/* Utils */
import { useMemoized } from "./utils";

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

// Item component.
export function ItemComponent({
  children: child,
  itemAddController,
  propsToData
}) {
  // The value provided doesn't change the reference.
  const value = useMemoized(
    () => {
      // Create the controllers.
      const eventController = new EventController();
      const itemRefController = new ItemRefController();
      // Add the data that won't change.
      itemRefController.set("key", child.key);
      itemRefController.set("eventController", eventController);
      // Return the controllers.
      return { eventController, itemRefController };
    },
    [] // eslint-disable-line
  );

  // Set the props.
  value.itemRefController.set("props", child.props);

  // Set the data.
  // if (propsToData) {
  //   // Get the data.
  //   const data = propsToData(child.props);

  //   // Must be an object.
  //   if (typeof data !== "object")
  //     throw new Error("The data returned by 'propsToData' must be an object.");

  //   // Set the data.
  //   value.itemRefController.set("data", data);
  // }

  // Called in useEffect to run it only on mount.
  useEffect(() => {
    // Set the item.
    itemAddController.requestItem(item => {
      decorateItem(item);
      decorateDOMItem(item.getElement());
      value.itemRefController.setItem(item);
    });

    // If the item is going to be unmounted
    // and it is being dragged it have to end the event
    // (Because it could be child of a different DOM element).
    return () => {
      const item = value.itemRefController.getItem();
      const grid = item.getGrid();

      // Remove the item.
      if (grid) {
        grid._component.itemRemoveController.removeItem(item);
      }

      // Stop the event.
      if (item.isDragging()) {
        item._drag.stop();
      }
    };
  }, []); // eslint-disable-line

  // Render.
  console.log(child)
  return child
  // return <ItemProvider value={value}>{child}</ItemProvider>;
}

// PropTypes.
ItemComponent.propTypes = {
  // itemAddController: PropTypes.object.isRequired,
  propsToData: PropTypes.func,
  children: PropTypes.element.isRequired
};

// Display name.
ItemComponent.displayName = "ItemComponent";
