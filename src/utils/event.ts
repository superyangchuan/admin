interface EventBusType {
  new (): EventBusType
  on: (event: string | string[], fn: Function) => EventBusType
  once: (event: string, fn: Function) => EventBusType
  off: (event?: string | string[], fn?: Function) => EventBusType
  emit: (event: string | string[], ...args: any[]) => EventBusType
}

function EventBus(this: any) {
  this._events = Object.create(null)
}

EventBus.prototype.on = function (event: string | string[], fn: Function) {
  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      this.on(event[i], fn)
    }
  } else {
    ;(this._events[event] || (this._events[event] = [])).push(fn)
  }

  return this
}

EventBus.prototype.once = function (event: string, fn: Function) {
  const _this = this
  function on() {
    _this.off(event, on)
    fn.apply(_this, arguments)
  }
  on.fn = fn

  _this.on(event, on)
  return _this
}

EventBus.prototype.off = function (event?: string | string[], fn?: Function) {
  if (!event) {
    this._events = Object.create(null)
    return this
  }

  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      this.off(event[i], fn)
    }
    return this
  }

  const cbs = this._events[event]
  if (!cbs) {
    return this
  }
  if (!fn) {
    this._events[event] = null
    return this
  }

  let i = cbs.length
  while (i--) {
    const cb = cbs[i]
    if (cb === fn || cb.fn === fn) {
      cbs.splice(i, 1)
      break
    }
  }
  return this
}

EventBus.prototype.emit = function (event: string, ...args: any[]) {
  let cbs = this._events[event]
  if (cbs) {
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](...args)
    }
  }
  return this
}

export default EventBus as unknown as EventBusType
