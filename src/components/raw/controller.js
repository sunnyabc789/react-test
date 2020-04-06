export class EventController {
  constructor() {
    // Map of the event->emitter
    this._eventsMap = new Map();
    this._payloadsMap = new Map();
  }

  // Enable an event, it can be emitted.
  enableEvent(event, emitter) {
    this._eventsMap.set(event, emitter);
  }

  // Emit an event and set its payload.
  emitEvent(event, payload) {
    if (this.isEnabled(event)) {
      this._payloadsMap.set(event, payload);
      this._eventsMap.get(event)();
    }
  }

  // Get the payload of the event.
  getPayload(event) {
    return this._payloadsMap.get(event);
  }

  // If at least an event is enabled.
  isEnabled(event) {
    return this._eventsMap.has(event);
  }
}












// The purpose of this controller is to make possible
// to set data in the item also if
// it has not been created yet.
export class ItemRefController {
  constructor() {
    this._item = null;
    this._data = {};
  }

  // Set data in the item.
  set(key, value) {
    if (this.hasItem()) {
      this._item._component[key] = value;
    } else {
      this._data[key] = value;
    }
  }

  // Get data from the item.
  get(key) {
    if (this.hasItem()) {
      return this._item._component[key];
    } else {
      return this._data[key];
    }
  }

  // Set the item.
  setItem(item) {
    this._item = item;
    Object.assign(this._item._component, this._data);
    this._data = null;
  }

  // Get the item.
  getItem() {
    return this._item;
  }

  // If the item has been setted.
  hasItem() {
    return !!this._item;
  }
}




export class ItemAddController {
  // Init.
  useInit() {
    this._requests = [];
  }

  // Emit the new items to the
  // components that made a request.
  emit(items) {
    for (let i = 0; i < this._requests.length; i++) {
      this._requests[i](items[i]);
    }
  }

  // Request an item.
  requestItem(cb) {
    return this._requests.push(cb);
  }
}
