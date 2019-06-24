type Listener = {
  type: 'live' | 'once'
  cb: Function
}

type EventMap = Map<string, Listener[]>

export class EventEmitter {
  constructor(private events: EventMap = new Map()) {}

  remove(name: string, cb: Function) {
    const cbs = this.events.get(name)

    if (cbs) {
      this.events.set(name, cbs.filter(l => l.cb !== cb))
    } else {
      throw new TypeError(`unknown event type: ${name}`)
    }
  }

  on(name: string, cb: Function, type: Listener['type'] = 'live') {
    const cbs = this.events.get(name) || []
    this.events.set(name, [...cbs, { type, cb }])
  }

  once(name: string, cb: Function) {
    this.on(name, cb, 'once')
  }

  emit(name: string, value?: any) {
    const cbs = this.events.get(name)
    cbs.forEach(l => {
      l.cb(value)
      l.type === 'once' && this.remove(name, l.cb)
    })
  }
}

export default new EventEmitter()
