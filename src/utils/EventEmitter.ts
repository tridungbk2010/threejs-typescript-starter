type CallbackFunction = (...args: any[]) => void;
type Callback = Record<string, CallbackFunction[]>;
type Callbacks = Record<string, Callback>;

type TResolveName = {
  original: string;
  value: string;
  namespace: string;
};

export default class EventEmitter {
  private callbacks: Callbacks;

  constructor() {
    this.callbacks = {};
    this.callbacks = {
      base: {},
    };
  }

  on(eventName: string, callback?: CallbackFunction) {
    if (!eventName || !callback) {
      return false;
    }

    const eventNames = this.resolveNames(eventName);

    eventNames.forEach((evtName) => {
      const name = this.resolveName(evtName);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object)) {
        this.callbacks[name.namespace] = {};
      }

      // Create callback if not exist
      if (!Array.isArray(this.callbacks[name.namespace][name.value])) {
        this.callbacks[name.namespace][name.value] = [];
      }

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });
    return this;
  }

  off(eventName: string) {
    if (!eventName) return false;

    const namesArr = this.resolveNames(eventName);

    namesArr.forEach((evtName) => {
      const name = this.resolveName(evtName);

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete this.callbacks[name.namespace];
      } else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace];
            }
          }
        } else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0)
            delete this.callbacks[name.namespace];
        }
      }
    });
    return this;
  }

  trigger(eventName: string, ...args: any[]) {
    if (!eventName) return false;

    let finalResult: any = null;
    let result = null;

    // Default args
    // const argsArr = Array.isArray(args) ? args : [];

    // Resolve names (should on have one event)
    let namesArr = this.resolveNames(eventName);
    // Resolve name
    const name = this.resolveName(namesArr[0]);

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach(function (cb) {
            result = cb.call(cb, ...args);

            if (typeof finalResult === 'undefined') {
              finalResult = result;
            }
          });
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name');
        return this;
      }

      this.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.call(callback, ...args);
        if (typeof finalResult === 'undefined') finalResult = result;
      });
    }

    return finalResult;
  }

  resolveNames(names: string): string[] {
    return names
      .replace(/[^a-zA-Z0-9 ,/.]/g, '')
      .replace(/[,/]+/g, ' ')
      .split(' ');
  }

  resolveName(name: string): TResolveName {
    const parts = name.split('.');
    return {
      original: name,
      value: parts[0],
      namespace: parts.length > 1 && !parts[1] ? parts[1] : 'base',
    };
  }
}
